import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import DialogBox from '../components/AddDialogBox'
import EditDialogBox from '../components/EditDialogBox'
import Header from '../components/Header'
import TodoList from '../components/TodoList'

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      descrption
      week
      completed
    }
  }
`;
interface TodoData {
    id: Int16Array;
    title : string;
    descrption?: string;
    week?: string;
    completed?: boolean;
}
const Index = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoData | {}>({});
  
  const handleEdit = (todo  : TodoData) => {
    setSelectedTodo(todo);
    setEditDialogVisible(true);
  };
  
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
    if (editDialogVisible) {
      setEditDialogVisible(false)
    }
  }
  const todos = data?.todos || [];
  console.log(todos);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Header handleAddTodo={toggleDialog} />
            <TodoList data={todos} refetch={refetch} handleEdit={handleEdit}/>           

            {openDialog && (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View>
                  <DialogBox onClose={()=>setOpenDialog(false)} refetch={refetch}/>
                </View>
              </TouchableWithoutFeedback>
            )}
            {editDialogVisible && (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View>
              <EditDialogBox onClose={()=>setEditDialogVisible(false)} refetch={refetch} data={selectedTodo}/>
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
