import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerStyle: { backgroundColor: "#fff", width: 240 },
      }}
    >
      <Drawer.Screen name="youtube" options={{ title: "YouTube" }} />
      <Drawer.Screen name="pexels" options={{ title: "Pexels" }} />
      {/* <Drawer.Screen name="menu" options={{ title: "Menu" }} /> */}
    </Drawer>
  );
}
