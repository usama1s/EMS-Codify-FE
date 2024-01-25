// managerSlice.ts
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS } from '../../../apis';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: number;
  roles: number[];
  designation?: string;
  date_of_joining?: string;
}
export interface loginFormState {
  email: string;
  password: string;
  user_type: number;
}

const initialState: loginFormState = {
  email: '',
  password: '',
  user_type: 0
};


export const logIn: any = createAsyncThunk('login/logIn', async (data) => {
  try {
    const response = await axios.post(APIS.login, data);
    const userData = response.data;

    localStorage.setItem('userData', JSON.stringify(userData));

    return userData;
  } catch (error) {
    throw error;
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<loginFormState>) => {
      return { ...state, ...action.payload };
    },
  },
});

const loginReducer = loginSlice.reducer;
export const { loginUser } = loginSlice.actions;

export const userLogin = (state: { login: any; }) => state.login;

export default loginReducer;


