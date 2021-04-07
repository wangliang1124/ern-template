import AsyncStorage from '@react-native-async-storage/async-storage';

// 这个主要存放接口方法，可以把 Native 接口或 restful 接口都统一放在这里，根据项目的复杂程度，可以按 feature 分多个文件存放
export default {
  demo: {
    fetchTodos() {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const todolist = await AsyncStorage.getItem('todolist');
          const todoList = JSON.parse(todolist) || [
            {
              id: 1,
              task: 'task1',
              completed: true,
              backgroundColor: '#fff',
            },
          ];
          resolve(todoList);
        }, 1000);
      });
    },
  },
  refundAlert: {},
  sift: {},
};
