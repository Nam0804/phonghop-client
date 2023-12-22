import { configureStore, createAction } from '@reduxjs/toolkit';
import counterReducer from '../features/login/loginSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

const addTodo = createAction('INCREMENT')
addTodo({ val: 5 })

export default store;