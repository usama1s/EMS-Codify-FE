export interface UserData {
    roles: any;
    user_id: number;
    profile_picture: string | null;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: number;
    designation: string;
    date_of_joining: string;
}

export interface ManagerInterface {
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


export interface EmployeeInterface {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    user_type: number;
    designation: string;
    date_of_joining: string;
    reporting_manager: number;
    contract_start_date: string;
    contract_end_date: string;
    pay: number;
    contract_status: number;
}

export interface Attendance {
    attendance_id: number;
    date: String;
    ClockIn: ClockEntry[];
    ClockOut: ClockEntry[];
    Progress: ProgressEntry[];
}

export interface ProgressEntry {
    start_time: any;
    end_time: string;
    title: string;
    description: string;
}

export interface ClockEntry {
    attendance_picture: any;
    time: string;
    location: string;
    clock_type: string;
}

export interface AttendanceData {
    attendance_id: number;
    user_id: number;
    attendance_picture: string;
    attendance: Attendance[];
    time_zone: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: number;
    designation: string;
    date_of_joining: string | null;
    profile_picture: string | null;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
}

export interface Position {
    coords: Coordinates;
    timestamp: number;
}

export interface userData {
    user_id: number;
}

export interface ClockOutData {
    attendance_picture: string;
    location: string;
    user_id: string;
    clock_type: string;
}

export interface ClockModalProps {
    isOpen: boolean;
    onClose: () => void;
    hours?: number;
    clockOutData?: {
        attendance_picture: string;
        location: string;
        user_id: string;
        clock_type: string;
    };
    handleClockOutOk: () => void
    otherFunction: () => void
}


export interface DashboardModalProps {
    onClose: () => void;
    date: any
    clockin: string;
    clockout: string;
    clockInPicture: any,
    clockOutPicture: any,
}

export interface AllEmployeeAttendanceModalProps {
    onClose: () => void;
    attendanceId: number;
    first_name: string;
    last_name: string;
    date: any;
    clockin: string;
    clockout: string;
    clockInPicture: any,
    clockOutPicture: any,
    clockInLocation: string,
    clockOutLocation: string,
}

export interface ManagersModalProps {
    onClose: () => void;
    first_name: string;
    last_name: string;
    email: string;
    user_type: number;
    roles: number[];
    designation: string;
    dateOfJoining: string;
}

export interface EmployeeDetailModalProps {
    onClose: () => void;
    first_name: string;
    last_name: string;
    email: string;
    user_type: number;
    designation: string;
    dateOfJoining: string;
}

export interface AttendanceModalProps {
    onClose: () => void;
}


export interface TimerProps {
    isRunning: boolean;
    onStart: () => void;
    onReset: () => void;
}
export interface Header {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}

export interface TableTwoProps {
    data: AttendanceData[];
}
export interface ManagersTableProps {
    data: ManagerInterface[];
}

export interface AttendanceTableProps {
    data: AttendanceData[];
}


export interface RegisterModalProps {
    onClose: () => void;
}

export interface PrimaryButtonInterface {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export interface EmployeeProgressModalInterface {
    onClose: () => void;
}

export interface MessegeModalProps {
    displayText: string;
    onClose: () => void;
    otherFunction: () => void;
}










// const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
//     const apiUrl = `https://api.example.com/reverse-geocode?lat=${latitude}&lon=${longitude}`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         // Extract the location name from the response.
//         const locationName = data.results[0]?.formatted_address || 'Unknown Location';
//         return locationName;
//     } catch (error) {
//         console.error('Error fetching location name:', error);
//         return 'Unknown Location';
//     }
// };


// if (hours !== undefined && hours <= 6) {


//     const clockOutData = {
//         attendance_picture: attendance_picture,
//         location: location,
//         user_id: userId,
//     };

//     try {
//         const response = await axios.post(APIS.clockOut, clockOutData);

//         if (response && response.data) {
//             alert(response.data.message);
//             navigate('/');
//         }
//     } catch (error) {
//         console.error('Error during clock out:', error);
//     }
// }

// Do something with the captured image, location, and location name.














{/* <form onSubmit={handleSubmit}>
                            <div className="relative bg-black p-6 flex-auto">
                                <div className="w-full">
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
                                <div className="w-full ">
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

                            </div>
                        
                            
                        </form> */}