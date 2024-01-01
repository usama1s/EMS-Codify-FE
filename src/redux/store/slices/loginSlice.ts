// managerSlice.ts
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS } from '../../../apis';


export interface loginFormState {
  email: string;
  password: string;
}

const initialState: loginFormState = {
  email: '',
  password: ''
};

const logIn:any = createAsyncThunk('login/logIn', async (data) => {
  try {
    const response = await axios.post(APIS.login, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<loginFormState>) => {
      // Ensure to handle the action payload correctly
      return { ...state, ...action.payload };
    },
    // ... (other reducers),
  },
});

const loginReducer = loginSlice.reducer;

export const userLogin = (state: { login: any; }) => state.login;
export { logIn };
export default loginReducer;
