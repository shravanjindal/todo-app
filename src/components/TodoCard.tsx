import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface TodoCardProps {
  data : {
    title:string;
    description:string;
    date:string;
    checked?: boolean;
  }
}
const TodoCard = ({data} :TodoCardProps) => {
  const [checked, setChecked] = useState(data.checked || false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };
  const handleEdit = () => {
    console.log('Edit button pressed');
  }
  const handleDelete = () => {
    console.log('Delete button pressed');
  }
  return (
    <View 
    style={[styles.container, {
        backgroundColor:checked ? '#d3d3d3' : '#FFA500'}
    ]}
    >
      <View>
      <TouchableOpacity onPress={toggleCheckbox}>
        <Feather
          name={checked ? 'check-square' : 'square'}
          style={styles.checkbox}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        {
          checked ? (
            <></>
          ) : (
            <Feather name="edit" style={styles.checkbox} />
          )
        }
       </TouchableOpacity>
      </View>
      
      <View 
        style={styles.innerContainer}
        >
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={styles.rightContainer}>
      <Text style={styles.time}>{data.date}</Text>
      <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash" style={styles.bin} />
       </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerContainer: {
    width: '70%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContainer: {
    width: '30%',
    paddingRight: 30,
    alignItems: 'flex-end',
  },
  title: {
    color: '#1e1e1e',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
  },
  time: {
    color: '#1e1e1e',
    fontSize: 12,
    marginBottom: 0,
    paddingBottom : 0,
    fontWeight: 'bold',
  },
  description: {
    color: '#1e1e1e',
    fontSize: 12,
    marginBottom: 10,
  },
  checkbox: {
    color: '#1e1e1e',
    fontSize: 20,
    marginRight: 10,
    marginTop: 5,
    width: 30,
  },
  bin : {
    color: '#1e1e1e',
    fontSize: 20,
    marginTop: 15,
    paddingTop: 0,
    width: 30,
  }
});

export default TodoCard;
