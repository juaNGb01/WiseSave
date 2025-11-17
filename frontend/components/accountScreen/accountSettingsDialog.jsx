import React, { useState } from "react";
import {
    Modal, View, Text, TextInput, Pressable, 
    StyleSheet, Alert, ActivityIndicator
} from "react-native";
// Para ícones, use sua biblioteca Symbol (assumimos FontAwesome/Lucide para RN)
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native"; 
// Você precisará instalar lucide-react-native se ainda não o fez:
// npm install lucide-react-native

// ⚠️ ATENÇÃO: As props 'open' e 'onOpenChange' se tornam 'isVisible' e 'onClose'
export const AccountSettingsDialog = ({
    isVisible,
    onClose, // Função para fechar o modal (recebe false)
    currentEmail,
    onSaveSettings // Função que será chamada no componente pai com os novos dados
}) => {
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Novo estado para carregamento

    const handleSave = () => {
        if (!newEmail && !newPassword) {
            Alert.alert("Atenção", "Nenhum campo de alteração foi preenchido.");
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        
        // 🎯 Chamada à função de salvamento do componente pai
        onSaveSettings({ newEmail, newPassword });

        // Limpa os campos após a tentativa de salvamento
        handleCancel(); 
    };

    const handleCancel = () => {
        setNewEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
        onClose(); // Chama a prop para fechar o modal
    };

    // A validação é simplificada aqui para RN
    const isFormValid = () => {
        if (newPassword && newPassword !== confirmPassword) return false;
        if (newEmail || newPassword) return true;
        return false;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible} // Controlado pela prop
            onRequestClose={handleCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.dialogHeader}>
                        <Text style={styles.dialogTitle}>Configurações da Conta</Text>
                        <Text style={styles.dialogDescription}>
                            Atualize seu email ou senha. Deixe em branco os campos que não deseja alterar.
                        </Text>
                    </View>

                    <View style={styles.formSection}>
                        
                        {/* Email Atual (Display) */}
                        <Text style={styles.inputLabel}>Email Atual</Text>
                        <View style={styles.inputWrapperDisabled}>
                            <Mail size={20} color="#9CA3AF" style={styles.icon} />
                            <TextInput
                                value={currentEmail}
                                editable={false} // Desabilita edição
                                style={styles.inputDisabled}
                            />
                        </View>
                        
                        {/* Novo Email */}
                        <Text style={styles.inputLabel}>Novo Email</Text>
                        <View style={styles.inputWrapper}>
                            <Mail size={20} color="#9CA3AF" style={styles.icon} />
                            <TextInput
                                placeholder="Digite o novo email"
                                value={newEmail}
                                onChangeText={setNewEmail}
                                keyboardType="email-address"
                                style={styles.inputField}
                            />
                        </View>

                        {/* Nova Senha */}
                        <Text style={styles.inputLabel}>Nova Senha</Text>
                        <View style={styles.inputWrapper}>
                            <Lock size={20} color="#9CA3AF" style={styles.icon} />
                            <TextInput
                                placeholder="Digite a nova senha"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showPassword}
                                style={styles.inputField}
                            />
                            <Pressable style={styles.toggleButton} onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <EyeOff size={20} color="#9CA3AF" />
                                ) : (
                                    <Eye size={20} color="#9CA3AF" />
                                )}
                            </Pressable>
                        </View>

                        {/* Confirmar Nova Senha */}
                        <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
                        <View style={styles.inputWrapper}>
                            <Lock size={20} color="#9CA3AF" style={styles.icon} />
                            <TextInput
                                placeholder="Confirme a nova senha"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                style={styles.inputField}
                            />
                            <Pressable style={styles.toggleButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (
                                    <EyeOff size={20} color="#9CA3AF" />
                                ) : (
                                    <Eye size={20} color="#9CA3AF" />
                                )}
                            </Pressable>
                        </View>

                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                            <Text style={styles.errorText}>As senhas não coincidem</Text>
                        )}
                        
                    </View>

                    <View style={styles.dialogFooter}>
                        <Pressable 
                            style={[styles.button, styles.cancelButton]} 
                            onPress={handleCancel}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                            disabled={!isFormValid() || loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// ----------------------------------------------------
// Estilos (Simulando o visual moderno do seu código original)
// ----------------------------------------------------
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)', // Fundo escurecido
    },
    modalView: {
        width: '90%',
        maxWidth: 500,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
    },
    dialogHeader: {
        marginBottom: 20,
    },
    dialogTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    dialogDescription: {
        fontSize: 14,
        color: '#666',
    },
    formSection: {
        marginVertical: 10,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        marginTop: 15,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        height: 50,
    },
    inputWrapperDisabled: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0', // Cor de fundo para desabilitado
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        height: 50,
    },
    icon: {
        marginLeft: 12,
        marginRight: 8,
    },
    inputField: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        paddingRight: 10,
        color: '#333',
    },
    inputDisabled: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        paddingRight: 10,
        color: '#9CA3AF', // Cor de texto desabilitado
    },
    toggleButton: {
        paddingHorizontal: 12,
        height: '100%',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
    dialogFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        gap: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#3498DB', // Cor primária
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});