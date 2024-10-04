import { CURRENT_ACTIVE_USER } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],

  reducers: {
    createTodo(state, action) {
      state.push({
        key: state.length + 1,
        value: action.payload,
        isCompleted: false,
      });
      localStorage.setItem(
        `tasks_${localStorage.getItem(CURRENT_ACTIVE_USER)}`,
        JSON.stringify([...state])
      );
    },
    deleteTodo(state, action) {
      const newState = state.filter((todo) => todo?.key !== action.payload);
      localStorage.setItem(
        `tasks_${localStorage.getItem(CURRENT_ACTIVE_USER)}`,
        JSON.stringify([...newState])
      );
      return newState;
    },
    editTodo(state, action) {
      const updatedTaskIndex = state.findIndex(
        (todo) => todo.key === action.payload?.key
      );
      if (updatedTaskIndex > -1) {
        state[updatedTaskIndex].value = action.payload?.value || "";
      }
      localStorage.setItem(
        `tasks_${localStorage.getItem(CURRENT_ACTIVE_USER)}`,
        JSON.stringify([...state])
      );
    },
    toggleCompleteTodo(state, action) {
      const taskIndex = state.findIndex((todo) => todo.key === action.payload);
      if (taskIndex > -1) {
        state[taskIndex].isCompleted = !state[taskIndex].isCompleted;
      }
      localStorage.setItem(
        `tasks_${localStorage.getItem(CURRENT_ACTIVE_USER)}`,
        JSON.stringify([...state])
      );
    },
    resetStore(state) {
      state = [];
      return state;
    },
    setStore(state, action) {
      if (action.payload) state = [...action.payload];
      return state;
    },
  },
});

const { actions, reducer: todosReducer } = todosSlice;

export const {
  createTodo,
  deleteTodo,
  editTodo,
  toggleCompleteTodo,
  resetStore,
  setStore,
} = actions;

export default todosReducer;
