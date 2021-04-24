import { createStore } from '../ProxyStore/createStore';

const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));

const todoStore = createStore({
  namespace: 'TodoStore',
  id: 0,
  testNull: null,
  todos: [
    {
      id: 0,
      content: 'first',
      status: 'DOING',
    },
  ],

  addTodo(content) {
    this.id++;
    const todo = {
      id: this.id,
      content: `${content}_${this.id}`,
      status: 'DOING',
    };
    this.todos.push(todo);
  },

  updateNull() {
    this.testNull = { name: 'testname' };
  },

  getTodoById(id) {
    return this.todos.filter((item) => item.id === id)[0];
  },

  updateTodo(id, status) {
    const todo = this.getTodoById(id);
    if (!todo) {
      return;
    }
    todo.status = status;
  },
  // test async function
  async delayIncId() {
    await sleep(1000 * 1);
    this.addTodo('Async add content');
  },
});

export default todoStore;
