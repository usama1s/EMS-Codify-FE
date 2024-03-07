import Breadcrumb from '../components/Breadcrumb';
import { UserData } from '../common/interfaces';
import AllManagersTable from '../components/Tables/AllManagersTable';

const RegisterUser: React.FC = () => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userType: number | null = userData ? userData.user_type : null;



    return (
        <>

            <Breadcrumb pageName={userType === 2 ? "Register Employee" : "Register Manager"} />
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <AllManagersTable />
                </div>
            </div>
        </>
    );
};

export default RegisterUser;
