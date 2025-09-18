import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const github = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://github.com/Rajveer-Mahida",
        }}
        style={{ flex: 1 }}
        onError={() => console.log("Something went wrong!")}
        onNavigationStateChange={(navState) => {
          console.log(navState.url);
        }}
      />
    </View>
  );
};

export default github;

const styles = StyleSheet.create({});
