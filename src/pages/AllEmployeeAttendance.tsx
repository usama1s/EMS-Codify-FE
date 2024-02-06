import axios from 'axios';
import { APIS } from '../apis.ts';
import { AttendanceData } from '../common/interfaces.ts';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.tsx';
import EmployeeAttendanceTable from '../components/Tables/AllEmployeeAttendenceTable.tsx';

const AllEmployeeAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIS.getAllEmployeesAttendence);
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
      <Breadcrumb pageName={"Dashboard"} />
      <EmployeeAttendanceTable data={attendanceData} />
    </>
  );
};

export default AllEmployeeAttendance;
