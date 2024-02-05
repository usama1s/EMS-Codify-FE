import { TableTwoProps } from "../common/interfaces";

import React, { useState } from 'react';
import DashboardModal from "./DashboardModal";
import RegisterModal from "./RegisterModal";



const TableTwo: React.FC<TableTwoProps> = ({ data }) => {

  const [showModal, setShowModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentdataIndex, setCurrentdataIndex] = useState(null);

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
          All Managers Attendence
        </h4>
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

      {/* {data.map((attendance, index) => (
        <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance?.first_name} {attendance.last_name}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{attendance.designation}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.email}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.attendance[0]?.date}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.attendance[0]?.ClockIn[0]?.time}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.attendance[0]?.ClockOut[0]?.time || "Still clocked in"}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-8 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2 " onClick={viewModal} >
              View Attendence Details
            </button>
          </div>
          {showModal ? (
            <DashboardModal onClose={handleClose} date={attendance.attendance[0]?.date} clockin={attendance.attendance[0]?.ClockIn[0]?.time} clockout={attendance.attendance[0]?.ClockOut[0]?.time} picture={attendance.attendance[0]?.ClockIn[0]?.attendance_picture} />
          ) : null}
        </div>
      ))} */}
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
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 35 35" viewBox="0 0 35 35" id="view">
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
        <DashboardModal
          onClose={handleClose}
          date={data[currentIndex].attendance[currentdataIndex].date}
          clockin={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.time}
          clockout={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.time}
          clockInPicture={data[currentIndex].attendance[currentdataIndex].ClockIn[0]?.attendance_picture}
          clockOutPicture={data[currentIndex].attendance[currentdataIndex].ClockOut[0]?.attendance_picture}
        />
      ) : null}
      {showRegisterModal ? (
        <RegisterModal onClose={closeRegisterModal} />
      ) : null}

    </div>
  );
};

export default TableTwo;
