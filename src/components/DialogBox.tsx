import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const DialogBox = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Todo</Text>
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
        <TouchableOpacity onPress={() => console.log('Date Picker Opened')} style={styles.button}>
            <Text style={styles.buttonText}>Pick Due Date</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Submit')} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
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