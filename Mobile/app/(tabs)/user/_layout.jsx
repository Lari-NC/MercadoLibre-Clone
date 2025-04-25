import { Stack } from "expo-router";

export default function UserStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="likedProducts" />
      <Stack.Screen name="sales" />
      <Stack.Screen name="purchases" />
      <Stack.Screen name="myProducts" />

    </Stack>
  );
}