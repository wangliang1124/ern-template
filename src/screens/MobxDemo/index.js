import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, Button, ScrollView, RefreshControl } from 'react-native';
import todoStore from '~/stores/todoStore';
import TodoItem from './components/TodoItem';

class MobxDemo extends React.Component {
  componentDidMount() {
    todoStore.loadTodos();
  }

  render() {
    const { isLoading, todos, createTodo, loadTodos } = todoStore;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadTodos} />}
      >
        {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
        <Button onPress={createTodo} title="Add Todo" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    padding: 10,
    textAlign: 'center',
  },
});

export default observer(MobxDemo);
