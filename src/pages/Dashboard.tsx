import AllManagersAttendanceTable from '../components/Tables/AllManagersAttendanceTable.tsx';
import Breadcrumb from '../components/Breadcrumb.tsx';

const Dashboard:React.FC = () => {

  return (
    <>
      <Breadcrumb pageName={"Dashboard"} />
      <AllManagersAttendanceTable  />
    </>
  );
};

export default Dashboard;
