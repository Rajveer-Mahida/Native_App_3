import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerShown: false,
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="screen2"
        options={{ title: "Screen 2", headerShown: false }}
      />
      <Stack.Screen
        name="screen3"
        options={{ title: "Screen 3", headerShown: false }}
      />

      {/* <Stack.Screen name="(menu)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
