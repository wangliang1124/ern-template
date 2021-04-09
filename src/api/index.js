import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseURL, { PIXABAY_API_KEY } from '~/config';
import { formatParams } from '~/utils';
import Request from '~/utils/request';

// 这个主要存放接口方法，可以把 Native 接口或 restful 接口都统一放在这里，根据项目的复杂程度，可以按 feature 分多个文件存放
// 对于异步网络请求的方法，使用 fetchSomethings 的命名方式
const Api = {
  Demo: {
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
    fetchImages({ q = '', page = 1, perPage = 20 }) {
      const params = {
        q,
        page,
        per_page: perPage,
      };
      const url = `${BaseURL.Pixabay}?key=${PIXABAY_API_KEY}&${formatParams(params)}`;

      return Request.get(url);
    },
  },
  refundAlert: {},
  sift: {},
};

export default Api;
