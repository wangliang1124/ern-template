import createStore from '../createStore';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const { getState, getDispatch, StateProvider } = createStore(reducer, initialState);

export { getState, getDispatch, StateProvider };
