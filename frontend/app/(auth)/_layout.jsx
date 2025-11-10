import { Stack } from 'expo-router';


export default function AuthLayout() {
  return (
    <Stack>
      {/* Esta screen corresponde ao seu arquivo login.js */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Acesso ao App",
          headerShown: false, // Oculta o cabeçalho nesta tela
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: "Cadastro",
          headerShown: false, // Oculta o cabeçalho nesta tela
        }} 
      />
      {/* Adicione outras telas de autenticação aqui (ex: register) */}
    </Stack>
  );
}
