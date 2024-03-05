import Breadcrumb from '../components/Breadcrumb';
import { UserData } from '../common/interfaces';
import AllEmployeeTable from '../components/Tables/AllEmployeesTable';

const EmployeeData = () => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userType: number | null = userData ? userData.user_type : null;

    

    return (
        <>

            <Breadcrumb pageName={userType === 2 ? "Register Employee" : "Register Manager"} />
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <AllEmployeeTable />
                </div>
            </div>
        </>
    );
};

export default EmployeeData;
