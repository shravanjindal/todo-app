import React from 'react';
import { View } from 'react-native';
import TodoCard from './TodoCard';
interface TodoData {
  title: string;
  description: string;
  date: string;
  checked?: boolean;
}
interface TodoListProps {
  data: TodoData[];
}
const TodoList = ({ data }: TodoListProps) => {
  return (
    <View>
      {data.map((todo: TodoData, index) => (
        <TodoCard
          key={index}
          data={{
            title: todo.title,
            description: todo.description,
            date: todo.date,
            checked: todo.checked,
          }}
        />
      ))}
    </View>

  )
}

export default TodoList