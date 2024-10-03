import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    createTodo(state, action) {
      console.log("actions", action);
      state.push({
        key: state.length + 1,
        value: action.payload,
        isCompleted: false,
      });
    },
    deleteTodo(state, action) {
      return state.filter((todo) => todo?.key !== action.payload);
    },
    editTodo(state, action) {
      const updatedTaskIndex = state.findIndex(
        (todo) => todo.key === action.payload?.key
      );
      if (updatedTaskIndex > -1) {
        state[updatedTaskIndex].value = action.payload?.value || "";
      }
    },
    toggleCompleteTodo(state, action) {
      const taskIndex = state.findIndex((todo) => todo.key === action.payload);
      if (taskIndex > -1) {
        state[taskIndex].isCompleted = !state[taskIndex].isCompleted;
      }
    },
  },
});

const { actions, reducer: todosReducer } = todosSlice;

export const { createTodo, deleteTodo, editTodo, toggleCompleteTodo } = actions;

export default todosReducer;
