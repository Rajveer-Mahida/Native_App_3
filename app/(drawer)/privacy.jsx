import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const Privacy = () => {
  const webViewRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleOnError = () => {
    setIsError(true);
    setRefreshing(false);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setIsError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    } else {
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.retryText}> Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: "https://iframely.com/terms" }}
          style={{ flex: 1 }}
          onError={handleOnError}
          onLoadEnd={() => setRefreshing(false)}
          pullToRefreshEnabled={true} // Android-only, works like RefreshControl
          startInLoadingState={true}
        />
      )}
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
  },
});
