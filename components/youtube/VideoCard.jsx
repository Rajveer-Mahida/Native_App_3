import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const extractVideoId = (item) => {
  if (!item) return null;
  if (typeof item.id === "string") return item.id;
  if (item.id && typeof item.id === "object" && item.id.videoId)
    return item.id.videoId;
  if (item.videoId) return item.videoId;
  if (item.snippet?.resourceId?.videoId) return item.snippet.resourceId.videoId;
  if (item.items) return extractVideoId(item.items);
  return null;
};

export const VideoCard = ({ item }) => {
  const router = useRouter();

  const snippet = item.snippet || {};
  const thumb =
    (snippet.thumbnails &&
      (snippet.thumbnails.medium || snippet.thumbnails.default)) ||
    {};
  const title = snippet.title || item.title || "Untitled";
  const channel = snippet.channelTitle || snippet.channel || "Unknown";
  const published = snippet.publishedAt
    ? new Date(snippet.publishedAt).toLocaleDateString()
    : "";

  const videoId = extractVideoId(item);

  const handlePress = () => {
    router.push(`player/${videoId}`);
    // if (videoId) {
    //   router.push({
    //     pathname: "./player/[videoId]", // Relative path - same level
    //     params: {
    //       videoId: videoId,
    //       title: title,
    //       channel: channel,
    //     },
    //   });
    //   // router.push(`/player/${videoId}`);
    // }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <View style={styles.card}>
        {thumb.url ? (
          <Image
            source={{ uri: thumb.url }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.thumbnail, styles.noThumbnail]} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.meta}>{channel}</Text>
          <Text style={styles.meta}>{published}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 1,
  },
  thumbnail: {
    width: 140,
    height: 80,
    backgroundColor: "#ddd",
    borderRadius: 8,
    margin: 4,
  },
  noThumbnail: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
  },
});
