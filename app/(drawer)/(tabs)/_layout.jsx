import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />,
      }}
      initialRouteName="(pexels)"
    >
      <Tabs.Screen
        name="(pexels)"
        options={{
          title: "Pexels",
          headerShadowVisible: false,

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "images" : "images-outline"}
              color="#112D4E"
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(youtube)"
        options={{
          title: "YouTube",
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "logo-youtube" : "logo-youtube"}
              color="#112D4E"
              size={28}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(menu)"
        options={{
          title: "Menu",
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "menu" : "menu-outline"}
              color="#112D4E"
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
