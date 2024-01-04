import { BaseURL } from "./config";

export const APIS= {
    registerManager: `${BaseURL}auth/register-user`,
    login: `${BaseURL}auth/sign-in`,
    markAttendance: `${BaseURL}attendence/insert-attendence`,

};