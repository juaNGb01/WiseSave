import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const explore = () => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        
        
      </View>

      {/* Título */}
      <Text style={styles.title}>Bem vindo, usuário</Text>

      {/* Menu de opções */}
      <View style={styles.menuContainer}>
        {/* Alterar nome */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✏️</Text>
          </View>
          <Text style={styles.menuText}>Alterar nome usuário</Text>
        </TouchableOpacity>

        {/* Alterar senha */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔒</Text>
          </View>
          <Text style={styles.menuText}>Alterar senha</Text>
        </TouchableOpacity>

        {/* Alterar email */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✉️</Text>
          </View>
          <Text style={styles.menuText}>Alterar email</Text>
        </TouchableOpacity>

        {/* Deletar conta */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🗑️</Text>
          </View>
          <Text style={styles.menuText}>Deletar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#000',
  },
  menuContainer: {
    gap: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 24,
    marginRight: 15,
  },
  icon: {
    fontSize: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default explore