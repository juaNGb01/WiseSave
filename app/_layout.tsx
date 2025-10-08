import { Stack } from "expo-router";

// Este é o layout raiz. Ele decide entre mostrar a tela de login OU o conjunto de abas.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
