import { useEffect, useState } from 'react';
import { LeaveData } from '../../common/interfaces';
import axios from 'axios';
import { APIS } from '../../apis';
import './filter-all.css';
// import MessegeModal from '../Modals/MessageModal';
import LeaveDetailModal from '../Modals/LeaveDetailModal';


const AllLeavesTable = () => {
    const [showLeaveModal, setShowLeaveModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);
    const [allLeaves, setAllLeaves] = useState<LeaveData[]>([]);
    // const [messege, setMessege] = useState<any>();
    // const [showMessegeModal, setShowMessegeModal] = useState<any>(false);


    useEffect(() => {
        fetchData();
    }, [allLeaves]);

    const fetchData = async () => {
        try {
            const response = await axios.get(APIS.getAllPendingleaves);
            if (response && response.data) {
                setAllLeaves(response.data);
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };
    // const closeMessageModal = () => {
    //     setShowMessegeModal(false)
    // }

    const LeaveModal = (index: any,) => {
        setCurrentIndex(index);
        setShowLeaveModal(true)
    }

    const closeLeaveModal = () => {
        setShowLeaveModal(false)
    }



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Leave list
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center"></div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">From Date</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Till Date</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Reason</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Status</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">View Application</p>
                </div>
            </div>
            {allLeaves.map((leave, index) => (
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                    <div className="col-span-1 flex items-center"></div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.first_name} {leave.last_name}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.from_date}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.till_date}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.leave_category}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{leave.leave_status}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        {leave.leave_status !== "approved" && leave.leave_status !== "rejected" && (
                            <div className="h-10 w-10 bg-blue-800 text-white ml-10" onClick={() => LeaveModal(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="view">
                                    <path d="M33.5,17.5c-4.4-6-10.2-9-16-9c-5.8,0-11.6,3-16,9C10.3,29.5,24.7,29.5,33.5,17.5z M12.3,12.5c-0.5,0.9-0.8,1.9-0.8,3
                                 c0,3.3,2.7,6,6,6s6-2.7,6-6c0-1.1-0.3-2.1-0.8-3c2.5,1,4.9,2.7,7,5c-3.5,3.9-7.7,6-12.1,6c-4.4,0-8.7-2.1-12.2-6
                                   C7.4,15.2,9.8,13.5,12.3,12.5z" fill="white"></path>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {showLeaveModal && currentIndex !== null ? (
                <LeaveDetailModal
                    onClose={closeLeaveModal}
                    firstName={allLeaves[currentIndex].first_name}
                    lastName={allLeaves[currentIndex].last_name}
                    fromDate={allLeaves[currentIndex].from_date}
                    tillDate={allLeaves[currentIndex].till_date}
                    leaveCategory={allLeaves[currentIndex].leave_category}
                    leaveStatus={allLeaves[currentIndex].leave_status}
                    leaveId={allLeaves[currentIndex].leave_id}
                />
            ) : null}

            {/* {showMessegeModal ? (
                <MessegeModal onClose={closeMessageModal} displayText={messege} otherFunction={function (): void { }} />
            ) : null} */}

        </div>
    );
};

export default AllLeavesTable;
