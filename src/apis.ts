// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BaseURL } from "./config";
export const APIS = {
    // AUTH
    registerManager: `${BaseURL}auth/register-user`,
    login: `${BaseURL}auth/sign-in`,
    // ADMIN
    getAllManagersAttendence: `${BaseURL}admin/get-all-managers-attendance/:year/:month`,
    getAllManagers: `${BaseURL}admin/get-all-managers`,
    // MANAGER
    getAllEmployees: `${BaseURL}manager/get-all-employees`,
    registerEmployee: `${BaseURL}manager/register-employee`,
    getAllEmployeesAttendence: `${BaseURL}manager/get-all-employees-attendance/:year/:month`,
    addAsset: `${BaseURL}manager/add-asset-data`,
    getAllUsers: `${BaseURL}manager/get-all-users`,
    getAllAsset: `${BaseURL}manager/get-all-assets`,
    getAllAssetNotAlloted: `${BaseURL}manager/get-all-assets-not-alloted`,
    allotAsset: `${BaseURL}manager/allot-asset`,
    getAllAllottedAsset: `${BaseURL}manager/get-all-alloted-assets`,
    createContact: `${BaseURL}manager/create-employee-contract`,
    // ATTENDANCE
    markAttendance: `${BaseURL}attendence/insert-attendence`,
    getClockInTime: `${BaseURL}attendence/get-clock-in-time/:user_id`,
    clockOut: `${BaseURL}attendence/clock-out`,
    // SHARED
    getAttendanceByUserId: `${BaseURL}shared/get-attendance`,
    getCLockInStatusByUserIdAndDate: `${BaseURL}shared/get-clockin-status/:userId/:date`,
    addDailyProgress: `${BaseURL}shared/add-daily-progress`,
    getClockInTimeByUserIdAndDate: `${BaseURL}shared/get-clockin-time/:userId/:date`,
    checkProgress: `${BaseURL}shared/check-progress`,
    checkAllProgressEntered: `${BaseURL}shared/check-all-progress-entered`,
    getProgressDetails: `${BaseURL}shared/get-progress-detail/:attendanceId/:date`,
    applyLeave: `${BaseURL}shared/apply-for-leave`,
    getAllPendingleaves: `${BaseURL}shared/get-all-pending-leaves`,
    updateLeaveStatus: `${BaseURL}shared/update-leave-status`,
    getAllAppliedleavesByUserId: `${BaseURL}shared/get-all-leaves-applied-by-userid`,
};

