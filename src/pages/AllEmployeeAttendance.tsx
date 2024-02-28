import Breadcrumb from '../components/Breadcrumb.tsx';
import EmployeeAttendanceTable from '../components/Tables/AllEmployeeAttendenceTable.tsx';

const AllEmployeeAttendance:React.FC = () => {


  return (
    <>
      <Breadcrumb pageName={"Dashboard"} />
      <EmployeeAttendanceTable/>
    </>
  );
};

export default AllEmployeeAttendance;
