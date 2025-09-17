import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const YouTubeHeader = ({ page, totalPages }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>YouTube Videos</Text>
      <Text style={styles.headerSub}>
        Page {page} {totalPages ? `of ${totalPages}` : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000"
  },
  headerSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
});