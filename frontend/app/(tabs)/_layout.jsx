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

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={tabBarScreenOptions}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Minha Lista",
          
          tabBarIcon: ({ color }) => (
            <IconSymbol name="cart-shop" size={35} color={color} />
          ),
          
        }}

      />
      <Tabs.Screen
        name="shopList"
        options={{
          title: "Nova Lista",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="plus" size={35} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="metrics"
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


}

