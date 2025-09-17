import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ImageCard } from "./ImageCard";

export const ImageGrid = ({
  images,
  isLoading,
  isRefreshing,
  isLoadingMore,
  error,
  onRefresh,
  onLoadMore,
  onImagePress,
}) => {
  if (isLoading && images.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading beautiful images...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText}>Pull to refresh</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={["#000"]}
        />
      }
      onMomentumScrollEnd={onLoadMore} // simulate load more at bottom
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {images.map((item) => (
          <ImageCard key={item.id} image={item} onPress={onImagePress} />
        ))}
      </View>

      {isLoadingMore && (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.loadingMoreText}>Loading more images...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // 👈 makes it a grid
    justifyContent: "flex-start",
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footerLoader: {
    padding: 20,
    alignItems: "center",
  },
  loadingMoreText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});
