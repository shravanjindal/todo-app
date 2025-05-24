import { gql, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`
const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoStatus($id: Int!, $completed: Boolean!) {
    updateTodoStatus(id: $id, completed: $completed) {
      id
      completed
    }
  }
`
interface TodoData {
  id: Int16Array;
  title : string;
  descrption?: string;
  week?: string;
  completed: boolean;
}
export interface TodoCardProps {
  data : TodoData;
  refetch?: () => void;
  handleEdit: (todo : TodoData) => void;
}
const TodoCard = ({data,refetch, handleEdit} :TodoCardProps) => {
  console.log('TodoCard data:', data);
  const [checked, setChecked] = useState(data.completed || false);
  const [deleteTodo, { loading, error }] = useMutation(DELETE_TODO)
  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS);
  const handleTodoStatus = (todo: TodoData) => {
    updateTodoStatus({
      variables: {
        id: todo.id,
        completed: todo.completed,
      },
    })
  }
  const toggleCheckbox = () => {
    try{
      data.completed = !checked;
      setChecked(!checked);
    } catch (error) {}
    finally {
      handleTodoStatus(data);
    }
  };
  const [toggleEditDialogBox, setToggleEditDialogBox] = useState(false);

  

  const handleDelete = () => {
    deleteTodo({
      variables: {
        id: data.id,
      },
    })
    .then(() => {
      console.log('Todo deleted successfully');
    })
    .catch(err => {
      console.error('Error deleting todo:', err);
      alert('Something went wrong while deleting the todo');
    })
    .finally(() => {
      refetch && refetch();
    });
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
      <TouchableOpacity onPress={() => handleEdit(data)}>
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
        <Text style={styles.description}>{data.descrption}</Text>
      </View>
      <View style={styles.rightContainer}>
      <Text style={styles.time}>{data.week}</Text>
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
