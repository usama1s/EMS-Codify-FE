import React, { useState } from 'react';
import AttendanceModal from '../Modals/AttendanceModal';
import { AttendanceTableProps, UserData } from '../../common/interfaces';
import PrimaryButton from '../UI/PrimaryButton';
import EmployeeProgressModal from '../Modals/EmployeeProgressModal';
import axios from 'axios';
import { APIS } from '../../apis';



const AttendenceTable: React.FC<AttendanceTableProps> = ({ data }) => {

    const [showAttendanceModal, setshowAttendance] = useState(false)
    const [showProgressModal, setshowProgressModal] = useState(false)

    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;

    // const [showRegisterModal, setShowRegisterModal] = useState(false)
    // const [currentIndex, setCurrentIndex] = useState(null);
    // const [currentdataIndex, setCurrentdataIndex] = useState(null);

    const openAttendanceModal = async () => {
        await setshowAttendance(true)
    }
    const openProgressModal = async () => {
        const clockInStatus = await checkClockStatusToAddProgress();
        if (clockInStatus == "Not clocked in") {
            alert("First clock in to add progress")
        }
        else if (clockInStatus == "CI") {
            setshowProgressModal(true)
        }
        else if (clockInStatus == "CO") {
            alert("First clock in to add progress")
        }
        // setshowProgressModal(true)

    }
    const checkClockStatusToAddProgress = async () => {
        try {
            const currentDate = new Date();

            if (currentDate.getTimezoneOffset() !== -300) {
                const estdate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                const date = estdate.toISOString().split('T')[0];
                const response = await axios.get(APIS.getCLockInStatusByUserIdAndDate, { params: { userId, date } });
                if (response) {
                    if (response.data.message) {
                        const message = response.data.message
                        return message
                    } else {
                        const clockType = response.data.clock_type
                        return clockType
                    }
                }
            } else {
                const date = currentDate.toISOString().split('T')[0];
                const response = await axios.get(APIS.getCLockInStatusByUserIdAndDate, { params: { userId, date } });
                if (response) {
                    const message = response.data.message
                    return message
                }
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    }
    const closeProgressModal = () => {
        setshowProgressModal(false)
    }
    const closeAttendanceModal = () => {
        setshowAttendance(false)
    }



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Attendance List
                </h4>
                <div className='flex gap-3'>
                    <PrimaryButton onClick={openProgressModal}>Mark Daily Progress</PrimaryButton>
                    <PrimaryButton onClick={openAttendanceModal}>Mark Attendence</PrimaryButton>
                </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Date</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Clock In</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Clock Out</p>
                </div>
            </div>
            {data.map((attendance, index) => (
                attendance.attendance.map((attendanceData) => (
                    <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendance.first_name} {attendance.last_name}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.date}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.ClockIn[0]?.time}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.ClockOut[0]?.time || "Still clocked in"}</p>
                        </div>
                        {/* <div className="col-span-1 flex items-center">
                            <div className="h-10 w-10 bg-blue-800 text-white ml-10" onClick={() => viewModal(index, dataIndex)}>
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 35 35" viewBox="0 0 35 35" id="view">
                                    <path d="M33.5,17.5c-4.4-6-10.2-9-16-9c-5.8,0-11.6,3-16,9C10.3,29.5,24.7,29.5,33.5,17.5z M12.3,12.5c-0.5,0.9-0.8,1.9-0.8,3
                           c0,3.3,2.7,6,6,6s6-2.7,6-6c0-1.1-0.3-2.1-0.8-3c2.5,1,4.9,2.7,7,5c-3.5,3.9-7.7,6-12.1,6c-4.4,0-8.7-2.1-12.2-6
                              C7.4,15.2,9.8,13.5,12.3,12.5z" fill="white"></path>
                                </svg>
                            </div>
                        </div> */}
                    </div>
                ))
            ))}
            {/* {showModal && currentIndex !== null && currentdataIndex !== null ? (
                <DashboardModal
                    onClose={handleClose}
                    date={data[currentIndex].attendance[currentdataIndex].date}
                    clockin={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.time}
                    clockout={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.time}
                    clockInPicture={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.attendance_picture}
                    clockOutPicture={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.attendance_picture}
                />
            ) : null} */}
            {showAttendanceModal ? (
                <AttendanceModal onClose={closeAttendanceModal} />
            ) : null}

            {showProgressModal ? (
                <EmployeeProgressModal onClose={closeProgressModal} />
            ) : null}

        </div>
    );
};

export default AttendenceTable;
