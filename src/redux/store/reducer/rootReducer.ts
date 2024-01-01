// path-to-your-reducers.ts
import { combineReducers } from 'redux';
import managerReducer from '../slices/managerSlice'; // Adjust the path as per your project structure
import loginReducer from '../slices/loginSlice'; // Adjust the path as per your project structure

const rootReducer = combineReducers({
  manager: managerReducer,
  login: loginReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
