import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
  });
};
