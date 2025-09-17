import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { VideoCard } from "./VideoCard";

export const VideoList = ({
  videos,
  isLoading,
  isRefreshing,
  isLoadingMore,
  error,
  onRefresh,
  onLoadMore,
  extractVideoId,
}) => {
  if (isLoading && videos.length === 0) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.loadingText}>Loading YouTube videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText}>Pull to refresh</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => <VideoCard item={item} />;

  const keyExtractor = (item, index) => {
    const id = item?.id || index;
    const videoId = extractVideoId(item) || null;
    return String(id + index);
  };

  return (
    <FlatList
      data={videos}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={["#FF0000"]}
        />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoadingMore ? (
          <View style={styles.footerLoading}>
            <ActivityIndicator size="small" color="#FF0000" />
            <Text style={styles.loadingMoreText}>Loading more videos...</Text>
          </View>
        ) : (
          <Text style={styles.copyright}>
            &copy; Youtube Copyright. All rights reserved.
          </Text>
        )
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  loadingWrap: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  center: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#b00020",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footerLoading: {
    padding: 16,
    alignItems: "center",
  },
  loadingMoreText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  copyright: {
    padding: 16,
    fontSize: 12,
    color: "#666",
    textAlign: "center",

    backgroundColor: "#fefefe",
  },
});
