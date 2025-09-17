import { useState, useCallback } from "react";

const PEXELS_API_KEY =
  "dIO8UziirWPbzJeVQUDFwQ51pUpcTzVJNP3QNKg1BJxOvAzMjGERIP1a"; // Replace with your API key
const BASE_URL = "https://api.pexels.com/v1";

export const usePexels = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (pageNum = 1, append = false) => {
    if (append) {
      if (isLoadingMore || !hasMore) return;
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/curated?page=${pageNum}&per_page=20`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.photos) {
        setImages((prev) => (append ? [...prev, ...data.photos] : data.photos));
        setPage(pageNum);
        setHasMore(data.photos.length > 0);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch images");
      console.error("Pexels API Error:", err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchImages(1, false);
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      fetchImages(page + 1, true);
    }
  }, [page, isLoadingMore, hasMore]);

  return {
    images,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    fetchImages,
    onRefresh,
    loadMore,
  };
};
