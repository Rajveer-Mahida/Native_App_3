import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
// import YoutubePlayer from "react-native-youtube-iframe";

const YouTubePlayer = () => {
  const { videoId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [showMore, setShowMore] = useState(false); // toggle full description
  const fullDescRef = useRef(null);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  useEffect(() => {
    const getVideoInfo = async () => {
      try {
        let res = await fetch(
          `https://api.freeapi.app/api/v1/public/youtube/videos/${videoId}`
        );
        let json = await res.json();
        setVideoData(json);
      } catch (err) {
        console.error("Error fetching video info:", err);
      }
    };
    getVideoInfo();
  }, [videoId]);

  const video = videoData?.data?.video.items;
  const channel = videoData?.data?.channel;

  // helper: parse description into clickable parts
  const renderDescription = (text) => {
    const regex = /(https?:\/\/[^\s]+|#[\w]+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <Text
            key={index}
            style={styles.link}
            onPress={() => Linking.openURL(part)}
          >
            {part}
          </Text>
        );
      } else if (part.startsWith("#")) {
        return (
          <Text
            key={index}
            style={styles.hashtag}
            onPress={() => console.log("Pressed hashtag:", part)}
          >
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Video Player */}
      <View style={styles.playerContainer}>
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#ff0000"
          />
        )}

        <WebView
          source={{ uri: embedUrl }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
        {/*
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
        /> */}
      </View>

      {/* Video Details */}
      {video && (
        <View style={styles.details}>
          <Text style={styles.title}>{video.snippet.title}</Text>
          <Text style={styles.stats}>
            {parseInt(video.statistics.viewCount).toLocaleString()} views •{" "}
            {new Date(video.snippet.publishedAt).toDateString()} •{" "}
            {video.statistics.likeCount} Likes
          </Text>

          {/* Channel Info */}
          {channel && (
            <View style={styles.channelContainer}>
              <Image
                source={{ uri: channel.info.thumbnails.high.url }}
                style={styles.channelImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.channelTitle}>{channel.info.title}</Text>
                <Text style={styles.subscribers}>
                  {parseInt(
                    channel.statistics.subscriberCount
                  ).toLocaleString()}{" "}
                  subscribers
                </Text>
              </View>
              <TouchableOpacity style={styles.subscribeBtn}>
                <Text style={styles.subscribeText}>Subscribe</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ---  Description Section --- */}
          <View ref={fullDescRef} style={{ marginTop: 10 }}>
            <Text>
              <Text style={styles.descriptionTitle}>Description</Text>{" "}
            </Text>

            <Text
              style={styles.description}
              numberOfLines={showMore ? undefined : 5}
            >
              {renderDescription(video.snippet.description)}
            </Text>
            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <Text style={styles.showMore}>
                {showMore ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default YouTubePlayer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  playerContainer: {
    height: 200,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
    overflow: "hidden",
  },
  webview: { flex: 1 },
  loader: { position: "absolute", top: "45%", left: 0, right: 0 },

  details: { padding: 12 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
    lineHeight: 24,
  },
  stats: { fontSize: 13, color: "#aaa", marginBottom: 8 },

  descriptionTitle: {
    fontSize: 16,
    color: "#000",
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: { fontSize: 14, color: "#000", lineHeight: 20 },
  showMore: {
    color: "#555",
    marginTop: 6,
    fontWeight: "600",
  },
  link: { color: "#065fd4" },
  hashtag: { color: "#065fd4" },

  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderTopColor: "#333",
  },
  channelImage: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  channelTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  subscribers: { fontSize: 13, color: "#aaa" },

  subscribeBtn: {
    backgroundColor: "#ff0000",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  subscribeText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
