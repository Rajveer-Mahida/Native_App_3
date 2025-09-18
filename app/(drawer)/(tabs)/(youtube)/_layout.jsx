import { Stack } from "expo-router";

export default function YouTubeLayout() {
  return (
    <Stack

    >
      <Stack.Screen
        name="index"
        options={{
          title: "YouTube Home",
          headerShown: false,
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
