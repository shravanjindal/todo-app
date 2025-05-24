import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  handleAddTodo: () => void;
}
const Header = ({handleAddTodo} : HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
        <Feather name="plus" style={styles.icons}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    color: '#FFA500',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    color: '#FFA500',
    fontSize: 20,
  },
  button: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});

export default Header;
