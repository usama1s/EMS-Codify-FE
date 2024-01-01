// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/reducer/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
