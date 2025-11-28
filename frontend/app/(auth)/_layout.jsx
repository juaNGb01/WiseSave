import { Stack } from 'expo-router';


export default function AuthLayout() {
  return (
    <Stack>
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
          headerShown: false, 
        }} 
      />
     
    </Stack>
  );
}
