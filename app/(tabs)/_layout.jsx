import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(youtube)"
        options={{
          title: "YouTube",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "logo-youtube" : "logo-youtube"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(pexels)"
        options={{
          title: "Pexels",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "images" : "images-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
