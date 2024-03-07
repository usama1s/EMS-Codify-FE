// managerSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ManagerInterface } from '../../../common/interfaces';



const initialState: ManagerInterface = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  user_type: 2,
  roles: [],
  designation: '',
  date_of_joining: '',
  user_id: 0,
  isEmployee: false
};



const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    registerManager: (state, action: PayloadAction<ManagerInterface>) => {
      // Ensure to handle the action payload correctly
      return { ...state, ...action.payload };
    },
    // ... (other reducers),
  },
});

const managerReducer = managerSlice.reducer;

export const selectManager = (state: { manager: any; }) => state.manager;
export default managerReducer;
