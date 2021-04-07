import CheckBox from '@react-native-community/checkbox';
import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, Button } from 'react-native';
import todoStore from '~/stores/todoStore';

function TodoItem({ todo }) {
  const { updateTodo, removeTodo } = todoStore;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: todo.backgroundColor,
      }}
      key={todo.id}
    >
      <Text>{todo.task}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          onChange={() => updateTodo(todo.id)}
          value={todo.completed}
          boxType="square"
          style={{ width: 20, height: 20, marginRight: 20 }}
        />
        <Button title="Delete" onPress={() => removeTodo(todo)} color="red" />
      </View>
    </View>
  );
}

export default observer(TodoItem);
