// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BaseURL } from "./config";
export const APIS = {
    registerManager: `${BaseURL}auth/register-user`,
    login: `${BaseURL}auth/sign-in`,
    getAllManagersAttendence: `${BaseURL}admin/get-all-managers-attendance`,
    getAllManagers: `${BaseURL}admin/get-all-managers`,
    markAttendance: `${BaseURL}attendence/insert-attendence`,
    getClockInTime: `${BaseURL}attendence/get-clock-in-time/:user_id`,
    clockOut: `${BaseURL}attendence/clock-out`,
};

