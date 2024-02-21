import { AttendanceData } from "../../common/interfaces";

import { useEffect, useState } from 'react';
import RegisterEmployeeModal from "../Modals/RegisterEmployeeModal";
import AllEmployeeAttendanceModal from "../Modals/AllEmployeeAttendanceModal";
import axios from "axios";
import { APIS } from "../../apis";
import { DropdownDate } from "react-dropdown-date";



const EmployeeAttendanceTable = ({ }) => {

    const [showModal, setShowModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentdataIndex, setCurrentdataIndex] = useState(null);
    const [data, setAttendanceData] = useState<AttendanceData[]>([]);
    const [month, setmonth] = useState<any>();
    let [year, setyear] = useState<any>("Select Year");
    const [monthstring, setmonthstring] = useState<any>("Select Month");

    useEffect(() => {
        if (typeof year === 'string') year = null;
        fetchData(year, month);
    }, [year, month]);

    const fetchData = async (year: number, month: number) => {
        try {
            const response = await axios.get(APIS.getAllEmployeesAttendence, { params: { year, month } });
            if (response && response.data) {
                setAttendanceData(response.data);
            }

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const handleYearChange = (year: any) => {
        setyear(year);
    };

    const handleMonthChange = (month: any) => {
        const monthNumber = mapMonthToNumber(month);
        setmonthstring(month)
        setmonth(monthNumber.toString());
    };

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



    const viewModal = (index: any, dataIndex: any) => {
        setCurrentIndex(index);
        setCurrentdataIndex(dataIndex)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }
    const closeRegisterModal = () => {
        setShowRegisterModal(false)
    }



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    All Employees Attendance List
                </h4>
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

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                    <p className="font-medium">Designation</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Email</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Date</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Clock In</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Clock Out</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Attendance Detail</p>
                </div>
            </div>
            {data.map((attendance, index) => (
                attendance.attendance.map((attendanceData, dataIndex) => (
                    <div key={index + dataIndex} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendance.first_name} {attendance.last_name}</p>
                        </div>
                        <div className="col-span-1 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">{attendance.designation}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendance.email}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.date}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{attendanceData.ClockIn[0]?.time}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
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
                    attendanceId={data[currentIndex].attendance[currentdataIndex].attendance_id}
                    first_name={data[currentIndex].first_name}
                    last_name={data[currentIndex].last_name}
                    date={data[currentIndex].attendance[currentdataIndex].date}
                    clockin={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.time}
                    clockout={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.time}
                    clockInPicture={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.attendance_picture}
                    clockInLocation={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.location}
                    clockOutPicture={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.attendance_picture}
                    clockOutLocation={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.location}
                />
            ) : null}
            {showRegisterModal ? (
                <RegisterEmployeeModal onClose={closeRegisterModal} />
            ) : null}

        </div>
    );
};

export default EmployeeAttendanceTable;
