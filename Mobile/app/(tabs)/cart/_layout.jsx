import { Stack } from "expo-router";

const Layout = () => <Stack screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="purchase" />
  </Stack>
export default Layout