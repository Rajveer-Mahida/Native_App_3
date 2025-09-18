import { Tabs } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Images, Youtube, Menu } from "lucide-react-native"; // Import only what you need

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />,
        tabBarActiveTintColor: "#112D4E",
        tabBarInactiveTintColor: "#9CA3AF", // grayish for inactive
      }}
      initialRouteName="(pexels)"
    >
      <Tabs.Screen
        name="(pexels)"
        options={{
          title: "Pexels",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Images color={color} size={24} strokeWidth={2.5} />
          ),
        }}
      />

      <Tabs.Screen
        name="(youtube)"
        options={{
          title: "YouTube",
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <Youtube color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="(menu)"
        options={{
          title: "Menu",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Menu color={color} size={24} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}
