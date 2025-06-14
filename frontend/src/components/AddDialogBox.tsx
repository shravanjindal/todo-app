import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import YearWeekPicker from './DatePicker';

// Define the mutation
const ADD_TODO = gql`
  mutation AddTodo($title: String!, $descrption: String, $week: String) {
    addTodo(title: $title, descrption: $descrption, week: $week) {
      id
      title
      descrption
      week
    }
  }
`;

interface DialogBoxProps {
  onClose?: () => void;
  refetch?: () => void;
}
const DialogBox = ({onClose, refetch} : DialogBoxProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [week, setweek] = useState('')
    const [toggleWeekPicker, setToggleWeekPicker] = useState(false)
    const [addTodo, { loading, error }] = useMutation(ADD_TODO);
    const handleSubmit = () => {
      if (!title) return alert('Title is required');
  
      addTodo({
        variables: {
          title,
          descrption: description,
          week
        },
      })
      .then(() => {
        setTitle('');
        setDescription('');
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong');
      })
      .finally(() => {
        onClose && onClose();
        refetch && refetch();
      });
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Todo</Text>
      <TextInput 
      placeholder="Enter Title"
      placeholderTextColor= '#d4d4d4'
      value={title}
      onChangeText={setTitle}
      style={styles.titleInput}
      />
      <TextInput 
        placeholder="Enter Description"
        placeholderTextColor= '#d4d4d4'
        value={description}
        onChangeText={setDescription}
        style={styles.descriptionInput}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top" // ensures text starts at the top
        />
        <TouchableOpacity onPress={() => {setToggleWeekPicker(!toggleWeekPicker)}} style={styles.button}>
            <Text style={styles.buttonText}>{week ? week : "Set Week"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add'}</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}

        {toggleWeekPicker && (
          <YearWeekPicker 
            onClose={() => setToggleWeekPicker(false)}
            onSelect={(year, week) => {
              setweek(`${year}-W${week}`);
              console.log(`Selected Year: ${year}, Week: ${week}`);
              setToggleWeekPicker(false);
            }}
          />
        )}
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: [
          { translateX: -150 },
          { translateY: -150 }, 
        ],
        width: 300,
        padding: 20,
        backgroundColor: '#1e1e1e',
        borderRadius: 20,
      },
          
    title : {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFA500',
    },
    titleInput : {
        borderWidth: 1,
        width: '100%',
        color:"#fff",
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    descriptionInput : {
        borderWidth: 1,
        borderColor: '#ccc',
        color:"#fff",
        width: '100%',
        height: 100,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#1e1e1e',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button : {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    }
})
export default DialogBox