import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { tabBarScreenOptions } from "@/constants/theme";

// Simulação de login: 'true' significa que o usuário está logado.
const useAuth = () => ({ isAuthenticated: true });

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o usuário não estiver logado, ele é enviado para a tela de login.
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Enquanto o app verifica e redireciona, não mostramos nada.
  if (!isAuthenticated) {
    return null;
  }

  // Se o usuário ESTÁ logado, mostramos as abas com seus ícones e cores.
  // Se o usuário ESTÁ logado, mostramos as abas com o design completo.
  return (
    <Tabs
      screenOptions={tabBarScreenOptions}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Minha Lista",
          // PASSO 2: USAR O ÍCONE AQUI
          tabBarIcon: ({ color }) => (
            <IconSymbol name="home" size={35} color={color} />
          ),
          
        }}

      />
      <Tabs.Screen
        name="shopList"
        options={{
          title: "Nova Lista",
          // PASSO 2: USAR O ÍCONE AQUI
          tabBarIcon: ({ color }) => (
            <IconSymbol name="plus" size={35} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: "Gastos",
          // PASSO 2: USAR O ÍCONE AQUI
          tabBarIcon: ({ color }) => (
            <IconSymbol name="chart-simple" size={35} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Conta",
          // PASSO 2: USAR O ÍCONE AQUI
          tabBarIcon: ({ color }) => (
            <IconSymbol name="user" size={35} color={color} />
          ),
        }}
      />
    </Tabs>
  );


  const styles = StyleSheet.create ({
    navbar : {
      
    }
  })
}

