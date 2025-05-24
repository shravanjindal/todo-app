import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import YearWeekPicker from './DatePicker';

// Define the mutation
const UPDATE_TODO = gql`
    mutation UpdateTodo($id: Int!, $title: String!, $descrption: String, $week: String) {
        updateTodo(id: $id, title: $title, descrption: $descrption, week: $week) {
        id
        title
        descrption
        week
        }
    }
`

interface EditDialogBoxProps {
data : {
    id: Int16Array;
    title : string;
    descrption?: string;
    week?: string;
    completed?: boolean;
};
  onClose?: () => void;
  refetch?: () => void;
}
const EditDialogBox = ({data,onClose, refetch} : EditDialogBoxProps) => {
    const [title, setTitle] = useState(data.title || '')
    const [description, setDescription] = useState(data.descrption || '')
    const [week, setweek] = useState(data.week || '')
    const [toggleWeekPicker, setToggleWeekPicker] = useState(false)
    const [updateTodo, { loading, error }] = useMutation(UPDATE_TODO);
    const handleSubmit = () => {
      if (!title) return alert('Title is required');
  
      updateTodo({
        variables: {
          id: data.id,
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
      <Text style={styles.title}>Edit Todo</Text>
      <TextInput 
      placeholder="Enter Title"
      value={title}
      onChangeText={setTitle}
      style={styles.titleInput}
      />
      <TextInput 
        placeholder="Enter Description"
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
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update'}</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}

        {toggleWeekPicker && (
          <YearWeekPicker 
            onClose={() => setToggleWeekPicker(false)}
            onSelect={(year, week) => {
                setweek(`${year}-W${week}`);
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
export default EditDialogBox