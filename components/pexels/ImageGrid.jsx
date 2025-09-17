import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ImageCard } from "./ImageCard";
import { Ionicons } from "@expo/vector-icons";

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
        <Ionicons name="alert-circle-outline" size={24} color="#d32f2f" />
        <Text style={styles.errorText}>No images found</Text>

        {/* <Text style={styles.errorText}>{error}</Text> */}
        <Text style={styles.retryText}>Pull to refresh</Text>
      </View>
    );
  }

  const renderItem = useCallback(({ item }) => (
    <ImageCard image={item} onPress={onImagePress} key={item.id} />
  ));

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#000" />
        <Text style={styles.loadingMoreText}>Loading more images...</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No images found</Text>
    </View>;
  };

  return (
    <>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#000"]}
          />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    justifyContent: "flex-start",
    // paddingHorizontal: 8,
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
