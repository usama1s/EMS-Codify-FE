// userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: number;
    roles: number[];
    designation: string;
    date_of_joining: string;
}

const initialState: UserState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: 0,
    roles: [],
    designation: '',
    date_of_joining: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
    },
});

const userReducer = userSlice.reducer

export const { setUserData } = userSlice.actions;

export default userReducer;
