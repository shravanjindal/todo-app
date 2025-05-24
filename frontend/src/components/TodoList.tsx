import React from 'react';
import { View } from 'react-native';
import TodoCard from './TodoCard';
interface TodoData {
  id: Int16Array;
  title : string;
  descrption?: string;
  week?: string;
  completed: boolean;
}
interface TodoListProps {
  data: TodoData[];
  refetch?: () => void;
  handleEdit: (todo : TodoData) => void;
}
const TodoList = ({ data,refetch, handleEdit }: TodoListProps) => {
  return (
    <View>
      {data.map((todo: TodoData, index) => (
        <TodoCard
          key={index}
          data={{
            id : todo.id,
            title: todo.title,
            descrption: todo.descrption,
            week: todo.week,
            completed: todo.completed,
          }}
          refetch={refetch}
          handleEdit={handleEdit}
        />
      ))}
    </View>

  )
}

export default TodoList