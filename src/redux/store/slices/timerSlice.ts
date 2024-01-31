// timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface TimerState {
    isRunning: boolean;
}

const initialState: TimerState = {
    isRunning: false,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: (state) => {
            state.isRunning = true;
        },
        pauseTimer: (state) => {
            state.isRunning = false;
        },
        resetTimer: (state) => {
            state.isRunning = false;
        },
    },
});

const timerReducer = timerSlice.reducer;
export const { startTimer, pauseTimer, resetTimer } = timerSlice.actions;
export default timerReducer;
