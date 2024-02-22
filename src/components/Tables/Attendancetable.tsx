import { useEffect, useState } from 'react';
import AttendanceModal from '../Modals/AttendanceModal';
import { AttendanceData, UserData } from '../../common/interfaces';
import PrimaryButton from '../UI/PrimaryButton';
import EmployeeProgressModal from '../Modals/EmployeeProgressModal';
import axios from 'axios';
import { APIS } from '../../apis';
import AllEmployeeAttendanceModal from '../Modals/AllEmployeeAttendanceModal';
import { DropdownDate } from 'react-dropdown-date';
import './filter-all.css';
import MessegeModal from '../Modals/MessageModal';


const AttendenceTable = () => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;


    let [year, setyear] = useState<any>("Select Year");
    const [monthstring, setmonthstring] = useState<any>("Select Month");
    const [showAttendanceModal, setshowAttendance] = useState(false)
    const [showProgressModal, setshowProgressModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentdataIndex, setCurrentdataIndex] = useState(null);
    const [AllAttendances, setAllAttendances] = useState<AttendanceData[]>([]);
    const [month, setmonth] = useState<any>();
    const [messege, setMessege] = useState<any>();
    const [showMessegeModal, setShowMessegeModal] = useState<any>(false);


    useEffect(() => {
        if (typeof year === 'string') year = null;
        fetchData(year, month);
    }, [year, month]);

    const fetchData = async (year: number, month: number) => {
        try {
            const response = await axios.get(APIS.getAttendanceByUserId, { params: { userId, month, year } });
            if (response && response.data) {
                setAllAttendances(response.data);
            }
            // console.log(AllAttendances)

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const openAttendanceModal = async () => {
        await setshowAttendance(true)
    }
    const openProgressModal = async () => {
        const clockInStatus = await checkClockStatusToAddProgress();
        if (clockInStatus == "Not clocked in") {
            setMessege("First clock in to add progress")
            setShowMessegeModal(true)
        }
        else if (clockInStatus == "CI") {
            setshowProgressModal(true)
        }
        else if (clockInStatus == "CO") {
            setMessege("First clock in to add progress")
            setShowMessegeModal(true)
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

    const closeMessageModal = () => {
        setShowMessegeModal(false)
    }

    const handleYearChange = (year: any) => {
        setyear(year);
    };

    const handleMonthChange = (month: any) => {
        const monthNumber = mapMonthToNumber(month);
        setmonthstring(month)
        setmonth(monthNumber.toString());
    };

    const viewModal = (index: any, dataIndex: any) => {
        setCurrentIndex(index);
        setCurrentdataIndex(dataIndex)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const mapMonthToNumber = (monthName: any) => {
        // You can implement your own logic here to map month names to numbers
        switch (monthName) {
            case 'January':
                return 1;
            case 'February':
                return 2;
            case 'March':
                return 3;
            case 'April':
                return 4;
            case 'May':
                return 5;
            case 'June':
                return 6;
            case 'July':
                return 7;
            case 'August':
                return 8;
            case 'September':
                return 9;
            case 'October':
                return 10;
            case 'November':
                return 11;
            case 'December':
                return 12;
            default:
                return 1; // Default to January if month name is not recognized
        }
    };


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Attendance List
                </h4>


                <div className=''>
                    <div className='flex gap-8 mb-5'>
                        <PrimaryButton onClick={openProgressModal}>Mark Daily Progress</PrimaryButton>
                        <PrimaryButton onClick={openAttendanceModal}>Mark Attendence</PrimaryButton>
                    </div>
                    <div className="filters-all">
                        <DropdownDate
                            onMonthChange={handleMonthChange}
                            onYearChange={handleYearChange}
                            defaultValues={{
                                year: year,
                                month: monthstring,
                            }}
                        />
                    </div>
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
            {AllAttendances.map((attendance, index) => (
                attendance.attendance.map((attendanceData, dataIndex) => (
                    <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendance.first_name} {attendance.last_name}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.date}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.ClockIn[0]?.time}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.ClockOut[0]?.time || "Still clocked in"}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <div className="h-10 w-10 bg-blue-800 text-white ml-10" onClick={() => viewModal(index, dataIndex)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="view">
                                    <path d="M33.5,17.5c-4.4-6-10.2-9-16-9c-5.8,0-11.6,3-16,9C10.3,29.5,24.7,29.5,33.5,17.5z M12.3,12.5c-0.5,0.9-0.8,1.9-0.8,3
                           c0,3.3,2.7,6,6,6s6-2.7,6-6c0-1.1-0.3-2.1-0.8-3c2.5,1,4.9,2.7,7,5c-3.5,3.9-7.7,6-12.1,6c-4.4,0-8.7-2.1-12.2-6
                              C7.4,15.2,9.8,13.5,12.3,12.5z" fill="white"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                ))
            ))}
            {showModal && currentIndex !== null && currentdataIndex !== null ? (
                <AllEmployeeAttendanceModal
                    onClose={handleClose}
                    attendanceId={AllAttendances[currentIndex].attendance[currentdataIndex].attendance_id}
                    first_name={AllAttendances[currentIndex].first_name}
                    last_name={AllAttendances[currentIndex].last_name}
                    date={AllAttendances[currentIndex].attendance[currentdataIndex].date}
                    clockin={AllAttendances[currentIndex].attendance[currentdataIndex].ClockIn[0]?.time}
                    clockout={AllAttendances[currentIndex].attendance[currentdataIndex].ClockOut[0]?.time}
                    clockInPicture={AllAttendances[currentIndex].attendance[currentdataIndex].ClockIn[0]?.attendance_picture}
                    clockInLocation={AllAttendances[currentIndex].attendance[currentdataIndex].ClockIn[0]?.location}
                    clockOutPicture={AllAttendances[currentIndex].attendance[currentdataIndex].ClockOut[0]?.attendance_picture}
                    clockOutLocation={AllAttendances[currentIndex].attendance[currentdataIndex].ClockOut[0]?.location}
                />
            ) : null}

            {showAttendanceModal ? (
                <AttendanceModal onClose={closeAttendanceModal} />
            ) : null}

            {showProgressModal ? (
                <EmployeeProgressModal onClose={closeProgressModal} />
            ) : null}

            {showProgressModal ? (
                <EmployeeProgressModal onClose={closeProgressModal} />
            ) : null}

            {showMessegeModal ? (
                <MessegeModal onClose={closeMessageModal} displayText={messege} otherFunction={function (): void { }} />
            ) : null}

        </div>
    );
};

export default AttendenceTable;
