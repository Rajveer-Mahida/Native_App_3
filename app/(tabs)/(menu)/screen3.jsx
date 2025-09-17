import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeView from "../../../components/SafeView";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

import { Redirect } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.header}>Screen 3</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => {
            router.dismissAll();
            router.replace("/");
          }}
        >
          <Text style={styles.buttonText}>Go to Main Menu</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#fff" />
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
