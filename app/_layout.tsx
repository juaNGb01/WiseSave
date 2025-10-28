import { Stack } from "expo-router";

// Este é o layout raiz. Ele decide entre mostrar a tela de login OU o conjunto de abas.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(auth)">
      <Stack.Screen name="(auth)"  />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
