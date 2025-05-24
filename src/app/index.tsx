import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import DialogBox from '../components/AddDialogBox'
import Header from '../components/Header'
import TodoList from '../components/TodoList'

const Index = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const toggleDialog = () => {
    try{
      setOpenDialog(!openDialog)

    } catch (error) {}
    finally {
      console.log('Dialog toggled:', openDialog)

    } 
  }

  const handleDismiss = () => {
    if (openDialog) {
      setOpenDialog(false)
    }
  }
  const data = [{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  },{
    title: 'Todo Item',
    description: 'This is a description of the todo item. It can be as long as needed.',
    date: '2025-25',
  }]
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Header handleAddTodo={toggleDialog} />
            <TodoList data={data}/>           

            {openDialog && (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View>
                  <DialogBox />
                </View>
              </TouchableWithoutFeedback>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Index
