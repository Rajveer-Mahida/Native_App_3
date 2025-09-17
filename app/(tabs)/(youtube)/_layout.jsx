import { Stack } from "expo-router";

export default function YouTubeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "YouTube Home",
          headerShown: true,
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {/* <Stack.Screen
        name="./player/[videoId]"
        options={{
          title: "Video Player",
          headerShown: true,
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          presentation: "card",
          // Animation for smoother transition
          // animation: "slide_from_right",
        }}
      /> */}
    </Stack>
  );
}
