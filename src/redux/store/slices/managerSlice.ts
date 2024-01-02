// managerSlice.ts
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS } from '../../../apis';


export interface ManagerState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  user_type: number;
  roles: number[];
  designation: string;
  dateOfJoining: string;
}

const initialState: ManagerState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  user_type: 2,
  roles: [],
  designation: '',
  dateOfJoining: '',
};

const registerManager: any = createAsyncThunk('manager/registerManager', async (data) => {
  try {
    const response = await axios.post(APIS.registerManager, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    registerManager: (state, action: PayloadAction<ManagerState>) => {
      // Ensure to handle the action payload correctly
      return { ...state, ...action.payload };
    },
    // ... (other reducers),
  },
});

const managerReducer = managerSlice.reducer;

export const selectManager = (state: { manager: any; }) => state.manager;
export { registerManager };
export default managerReducer;
