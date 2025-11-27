import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// AGORA RECEBE PROPS DO PAI
export default function BtnSelection({ currentDate, onMonthChange }) {

    // A lógica de formatação continua aqui (é visual)
    const formattedDate = currentDate.toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric'
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <View style={styles.buttonSelectMonth}>
            {/* Botão Voltar */}
            <Pressable
                // Chama a função do pai passando -1
                onPress={() => onMonthChange(-1)}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <IconSymbol name="angle-left" size={20} color="#333" />
            </Pressable>

            {/* Texto Centralizado */}
            <Text style={styles.monthText}>
                {capitalizeFirstLetter(formattedDate)}
            </Text>

            {/* Botão Avançar */}
            <Pressable
                // Chama a função do pai passando +1
                onPress={() => onMonthChange(1)}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <IconSymbol name="angle-right" size={20} color="#333" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonSelectMonth: {
        flexDirection: "row",
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between', // Garante espaçamento uniforme
        width: '80%', // Ocupa 80% da tela para ficar centralizado
        backgroundColor: '#F5F5F5', // Um fundo sutil ajuda na UX
        padding: 10,
        borderRadius: 12,
        alignSelf: 'center' // Centraliza o componente na View pai
    },
    monthText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        minWidth: 140, // Evita que o texto pule de tamanho
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.5 // Feedback visual de clique
    }
});