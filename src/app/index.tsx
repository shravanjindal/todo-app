import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import DialogBox from '../components/DialogBox'
import Header from '../components/Header'
import TodoCard from '../components/TodoCard'

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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Header handleAddTodo={toggleDialog} />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />

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
