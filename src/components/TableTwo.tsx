import { AttendanceData } from "../common/interfaces";

import React from 'react';

interface TableTwoProps {
  data: AttendanceData[];
}

const TableTwo: React.FC<TableTwoProps> = ({ data }) => {

  const decodeBase64Image = (base64String: string) => {
    const decodedString = atob(base64String);
    const byteNumbers = new Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
      byteNumbers[i] = decodedString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const dataUrl = URL.createObjectURL(blob);
    return dataUrl;
  };
  // const decodeBase64Image = (base64String: string) => {
  //   const blob = new Blob([base64String], { type: 'image/jpeg' });
  //   const dataUrl = URL.createObjectURL(blob);
  //   return dataUrl;
  // };


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
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
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Date</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Clock In</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Clock Out</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Attendance Picture</p>
        </div>
      </div>

      {data.map((attendance, index) => (
        <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.Fullname}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{attendance.designation}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.email}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.attendance_date_time}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{attendance.attendance_date_time}</p>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <img src={decodeBase64Image(attendance.attendance_picture)} alt="Attendance" className="w-12 h-12 object-cover rounded-full" />
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
