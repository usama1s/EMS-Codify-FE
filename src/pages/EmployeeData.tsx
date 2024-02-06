import Breadcrumb from '../components/Breadcrumb';
import { ManagerInterface, ManagersTableProps, UserData } from '../common/interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIS } from '../apis';
import AllEmployeeTable from '../components/Tables/AllEmployeesTable';

const EmployeeData = () => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userType: number | null = userData ? userData.user_type : null;

    const [AllEmployee, setAllEmployee] = useState<ManagersTableProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(APIS.getAllEmployees);
                if (response && response.data) {
                    setAllEmployee(response.data);
                }
                console.log(AllEmployee)

            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            <Breadcrumb pageName={userType === 2 ? "Register Employee" : "Register Manager"} />
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <AllEmployeeTable data={AllEmployee as unknown as ManagerInterface[]} />
                </div>
            </div>
        </>
    );
};

export default EmployeeData;
