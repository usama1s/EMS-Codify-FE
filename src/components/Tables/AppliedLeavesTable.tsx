import { useEffect, useState } from 'react';
import { LeaveData, UserData } from '../../common/interfaces';
import axios from 'axios';
import { APIS } from '../../apis';
import './filter-all.css';
import PrimaryButton from '../UI/PrimaryButton';
import LeaveModal from '../Modals/leaveModal';


const AppliedLeavesTable = () => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;
    const [allLeaves, setAllLeaves] = useState<LeaveData[]>([]);
    const [showLeaveModal, setshowLeaveModal] = useState(false)



    useEffect(() => {
        fetchData();
    }, [allLeaves]);

    const fetchData = async () => {
        try {
            const response = await axios.get(APIS.getAllAppliedleavesByUserId, { params: { userId } });
            if (response && response.data) {
                setAllLeaves(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const openleaveModal = async () => {
        await setshowLeaveModal(true)
    }
    const closeleaveModal = async () => {
        await setshowLeaveModal(false)
    }



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Leave list
                </h4>
                <div className=''>
                    <div className='flex gap-8 mb-5'>
                        <PrimaryButton onClick={openleaveModal}>Apply for leave</PrimaryButton>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">From Date</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Till Date</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Reason</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Status</p>
                </div>
            </div>
            {allLeaves.map((leave, index) => (
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.first_name} {leave.last_name}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.from_date}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.till_date}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.leave_category}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.leave_status}</p>
                    </div>
                </div>
            ))}

            {showLeaveModal ? (
                <LeaveModal onClose={closeleaveModal} />
            ) : null}



        </div>
    );
};

export default AppliedLeavesTable;
