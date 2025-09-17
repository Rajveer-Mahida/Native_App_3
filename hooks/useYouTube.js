import React, { useCallback, useState } from "react";

export const useYouTube = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query] = useState("javascript");
  const [videos, setVideos] = useState([]);
  const [meta, setMeta] = useState({
    totalPages: 1,
    nextPage: false,
    previousPage: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);

  const extractVideoId = (item) => {
    if (!item) return null;
    if (typeof item.id === "string") return item.id;
    if (item.id && typeof item.id === "object" && item.id.videoId)
      return item.id.videoId;
    if (item.videoId) return item.videoId;
    if (item.snippet?.resourceId?.videoId)
      return item.snippet.resourceId.videoId;
    if (item.items) return extractVideoId(item.items);
    return null;
  };

  const fetchYoutubeVideos = async (p = 1, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    setError(null);
    try {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${p}&limit=${limit}&query=${query}`
      );
      const json = await res.json();

      let items = [];
      if (json && json.data) {
        if (Array.isArray(json.data.data)) {
          items = json.data.data.map((entry) => entry.items || entry);
          setMeta({
            totalPages: json.data.totalPages || 1,
            nextPage: !!json.data.nextPage,
            previousPage: !!json.data.previousPage,
          });
        }
      }

      setVideos((prev) => (append ? [...prev, ...items] : items));
      setPage(p);
    } catch (err) {
      setError(err.message || "Failed to fetch videos");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchYoutubeVideos(1, false);
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && meta.nextPage) {
      fetchYoutubeVideos(page + 1, true);
    }
  }, [isLoadingMore, meta.nextPage, page]);

  return {
    page,
    videos,
    meta,
    isLoading,
    error,
    isRefreshing,
    isLoadingMore,
    extractVideoId,
    fetchYoutubeVideos,
    onRefresh,
    loadMore,
  };
};
