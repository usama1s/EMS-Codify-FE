// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BaseURL } from "./config";
export const APIS = {
    registerManager: `${BaseURL}auth/register-user`,
    login: `${BaseURL}auth/sign-in`,
    markAttendance: `${BaseURL}attendence/insert-attendence`,
    getAllManagersAttendence: `${BaseURL}admin/get-all-managers-attendance`,
};

// interface LoginUserRequestBody {
//     email: string;
//     password: string;
//     user_type: number;
// }

// export const authApi = createApi({
//     reducerPath: "authApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: BaseURL
//     }),
//     endpoints: (builder) => ({
//         loginUser: builder.mutation({
//             query: (body: LoginUserRequestBody) => {
//                 return {
//                     url: "/sign-in",
//                     method: "post",
//                     body,
//                 }
//             }
//         })
//     })
// });
// export const { useLoginUserMutation } = authApi as any;
