import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SafeView = ({ children, style }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
