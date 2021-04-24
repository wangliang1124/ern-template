import React, { createContext, useContext, useReducer } from 'react';

import { sleep } from '~/utils';

export const ThemeContext = createContext();

const initialState = { theme: 'light' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>{children}</ThemeContext.Provider>
);

export function getState() {
  return useContext(ThemeContext);
}

export const toggleTheme = async (dispatch) => {
  await sleep(1000);

  dispatch({ type: 'changeTheme' });
};
