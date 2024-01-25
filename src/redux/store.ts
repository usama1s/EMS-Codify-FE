// store.js

import { configureStore } from '@reduxjs/toolkit';
import managerReducer from './store/slices/managerSlice';
import loginReducer from './store/slices/loginSlice';
import userReducer from './store/slices/userSlice';

const store = configureStore({
  reducer: {
    manager: managerReducer,
    login: loginReducer,
    user: userReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
