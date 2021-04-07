import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, runInAction } from 'mobx';
import api from '~/api';
import { getRandomColor, uuidv4 } from '~/utils';

class TodoStore {
  todos = [];

  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetches all Todos from the server.
  loadTodos = () => {
    this.isLoading = true;
    api.demo.fetchTodos().then((fetchedTodos) => {
      runInAction(() => {
        fetchedTodos.forEach((json) => this.updateTodoFromServer(json));
        this.isLoading = false;
      });
    });
  };

  // Update a Todo with information from the server. Guarantees a Todo only
  // exists once. Might either construct a new Todo, update an existing one,
  // or remove a Todo if it has been deleted on the server.
  updateTodoFromServer(json) {
    let todo = this.todos.find((todo) => todo.id === json.id);
    if (!todo) {
      todo = new Todo(this, json.id);
      this.todos.push(todo);
    }
    if (json.isDeleted) {
      this.removeTodo(todo);
    } else {
      todo.updateFromJson(json);
    }
    this.saveTodoList();
  }

  // Creates a fresh Todo
  createTodo = () => {
    const todo = new Todo(this);
    this.todos.push(todo);
    this.saveTodoList();
    return todo;
  };

  updateTodo = (id) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    this.saveTodoList();
  };

  // A Todo was somehow deleted, clean it from the client memory.
  removeTodo = (todo) => {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.saveTodoList();
  };

  saveTodoList = () => {
    AsyncStorage.setItem('todolist', JSON.stringify(this.todos.map((todo) => todo.asJson)));
  };
}

export class Todo {
  id = null; // Unique id of this Todo, immutable.

  task = '';

  completed = false;

  store = null;

  backgroundColor = '#fff';

  constructor(store, id = uuidv4()) {
    makeAutoObservable(this, {
      id: false,
      store: false,
      autoSave: false,
      saveHandler: false,
      dispose: false,
    });

    this.store = store;
    this.id = id;
    this.task = `Task ${Math.random().toString(16).slice(2)}`;
    this.backgroundColor = getRandomColor();
  }

  get asJson() {
    return {
      id: this.id,
      task: this.task,
      completed: this.completed,
      backgroundColor: this.backgroundColor,
    };
  }

  // Update this Todo with information from the server.
  updateFromJson(json) {
    this.completed = json.completed;
    this.task = json.task;
    this.backgroundColor = json.backgroundColor;
  }
}

export default new TodoStore();
