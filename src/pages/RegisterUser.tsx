// import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../components/Breadcrumb';
// import { registerManager, selectManager } from '../redux/store/slices/managerSlice';
// import { useState } from 'react';
import { AttendanceData, UserData } from '../common/interfaces';
// import RegisterModal from '../components/RegisterModal';
import TableTwo from '../components/TableTwo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIS } from '../apis';

// const roles = ['Employee/Intern Attendence', 'Leave Approvel', 'Daily Progress', 'Pay Schedule', 'Employee data', 'Office Decorum']; 



const RegisterUser = () => {



    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userType: number | null = userData ? userData.user_type : null;

    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(APIS.getAllManagersAttendence);
                if (response && response.data) {
                    setAttendanceData(response.data);

                }

            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchData();
    }, []);





    return (
        <>

            <Breadcrumb pageName={userType === 2 ? "Register Employee" : "All Manager"} />
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <TableTwo data={attendanceData} />

                    {/* <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) => handleChange('first_name', e.target.value)}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) => handleChange('last_name', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password should be more than 8 characters"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('password', e.target.value)}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password should be more than 8 characters"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('confirm_password', e.target.value)}
                                />
                            </div>
                            {userType !== 2 && (
                                <div className="relative mb-4.5 flex flex-col ">
                                    <label className="mb-2.5 block text-black dark:text-white">Assign roles</label>
                                    {roles.map((role) => (
                                        <label key={role}>
                                            <input
                                                type="checkbox"
                                                value={roleValues[role]}
                                                checked={selectedRoles.includes(role)}
                                                onChange={() => handleCheckboxChange(role)}
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            )}



                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('designation', e.target.value)}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Date of joining
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('date_of_joining', e.target.value)}
                                />
                            </div>
                            <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Register
                            </button>
                        </div>
                    </form> */}

                </div>
            </div>
        </>
    );
};

export default RegisterUser;
