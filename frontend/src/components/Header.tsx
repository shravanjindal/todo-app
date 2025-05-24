import { Feather } from '@expo/vector-icons';
import { endOfISOWeek, format, getISOWeek, startOfISOWeek } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  handleAddTodo: () => void;
}

const Header = ({ handleAddTodo }: HeaderProps) => {
  const today = new Date();
  const weekNumber = getISOWeek(today);
  const start = startOfISOWeek(today);
  const end = endOfISOWeek(today);

  const formattedStart = format(start, 'MMM d'); // e.g., May 20
  const formattedEnd = format(end, 'MMM d');     // e.g., May 26

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
        <Feather name="plus" style={styles.icons} />
      </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        W{weekNumber} ({formattedStart} - {formattedEnd})
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer : {
    backgroundColor: '#1e1e1e',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  container: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingBottom: 10,
 },
  title: {
    color: '#FFA500',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#d3d3d3',
    fontSize: 14,
    paddingLeft: 20,
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
