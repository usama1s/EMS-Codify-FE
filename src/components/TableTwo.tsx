import { TableTwoProps } from "../common/interfaces";

import React, { useState } from 'react';
import DashboardModal from "./DashboardModal";
import RegisterModal from "./RegisterModal";



const TableTwo: React.FC<TableTwoProps> = ({ data }) => {

  const [showModal, setShowModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const viewModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }
  const closeRegisterModal = () => {
    setShowRegisterModal(false)
  }

  const openRegisterModal = () => {
    setShowRegisterModal(true)
  }



  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Managers Attendence
        </h4>
        <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-8 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2 " onClick={openRegisterModal} >
          Register Manager
        </button>
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
      ))}
      {showRegisterModal ? (
        <RegisterModal onClose={closeRegisterModal} />
      ) : null}

    </div>
  );
};

export default TableTwo;
