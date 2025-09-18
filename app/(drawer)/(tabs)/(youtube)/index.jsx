import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { VideoList } from "@/components/youtube/VideoList";
import { YouTubeHeader } from "@/components/youtube/YouTubeHeader";
import { useYouTube } from "@/hooks/useYouTube"; // Your existing hook
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function YouTubeHome() {
  const {
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
  } = useYouTube();

  useEffect(() => {
    fetchYoutubeVideos(1);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["top", "left", "right", "bottom"]}
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
        }}
      >
        <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />

        <View style={styles.container}>
          {/* <YouTubeHeader page={page} totalPages={meta.totalPages} /> */}
          <VideoList
            videos={videos}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            isLoadingMore={isLoadingMore}
            error={error}
            onRefresh={onRefresh}
            onLoadMore={loadMore}
            extractVideoId={extractVideoId}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
