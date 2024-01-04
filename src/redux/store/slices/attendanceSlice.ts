// managerSlice.ts
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS } from '../../../apis';


export interface AttendanceFormState {
    attendance_picture: string;
    location: string;
}

const initialState: AttendanceFormState = {
    attendance_picture: '',
    location: '',
};

const attendance: any = createAsyncThunk('attendance/attendance', async (data) => {
    try {
        const response = await axios.post(APIS.markAttendance, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});


const attendenceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        userAttendance: (state, action: PayloadAction<AttendanceFormState>) => {
            // Ensure to handle the action payload correctly
            return { ...state, ...action.payload };
        },
        // ... (other reducers),
    },
});

const attendanceReducer = attendenceSlice.reducer;

export const userLogin = (state: { login: any; }) => state.login;
export { attendance };
export default attendanceReducer;
