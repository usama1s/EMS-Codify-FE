import { useEffect, useState } from 'react';
import { ContractsInterface, LeaveData } from '../../common/interfaces';
import axios from 'axios';
import { APIS } from '../../apis';
import './filter-all.css';
// import MessegeModal from '../Modals/MessageModal';
import LeaveDetailModal from '../Modals/LeaveDetailModal';
import PrimaryButton from '../UI/PrimaryButton';
import PayModal from '../Modals/PayModal';


const PayScheduleTable = () => {
    const [showLeaveModal, setShowLeaveModal] = useState(false)
    // const [currentIndex, setCurrentIndex] = useState(null);
    const [activeMonth, setActiveMonth] = useState();
    // const [messege, setMessege] = useState<any>();
    // const [showMessegeModal, setShowMessegeModal] = useState<any>(false);

    const [contracts, setContracts] = useState<ContractsInterface[] | undefined>()
    const [showPayModal, setShowPayModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(APIS.getAllActiveContracts);
                if (response && response.data) {
                    setContracts(response.data);
                }

            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchData();
    }, []);


    const closePayModal = () => {
        setShowPayModal(false)
    }

    const openPayModal = (index: any) => {
        setCurrentIndex(index)
        setShowPayModal(true)
    }

    const LeaveModal = (index: any,) => {
        setCurrentIndex(index);
        setShowLeaveModal(true)
    }

    const closeLeaveModal = () => {
        setShowLeaveModal(false)
    }

    const currentDate = new Date();

    // Array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    // Extracting the month number (0-indexed) and name
    const monthNumber = currentDate.getMonth();
    const monthName = monthNames[monthNumber];



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Pay Schedule
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">

                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Active Month</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Pay Amount</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Bonus</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Tax Deduction</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Total Paid</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">action</p>
                </div>
            </div>
            {contracts && contracts.map((contract, index) => (
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>

                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{contract.reportingManager}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{monthName}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{contract.pay}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='number'
                            placeholder='Enter Bonus'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        // onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='number'
                            placeholder='Enter Bonus'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        // onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='{field.type}'
                            placeholder='Total amount paid'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        readOnly
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <PrimaryButton onClick={() => openPayModal(index)}>Pay now</PrimaryButton>
                    </div>
                </div>
            ))}

            {/* {showLeaveModal && currentIndex !== null && contracts ? (
                <LeaveDetailModal
                    onClose={closeLeaveModal}
                    firstName={contracts[currentIndex].first_name}
                    lastName={contracts[currentIndex].last_name}
                    fromDate={contracts[currentIndex].from_date}
                    tillDate={contracts[currentIndex].till_date}
                    leaveCategory={contracts[currentIndex].leave_category}
                    leaveStatus={contracts[currentIndex].leave_status}
                    leaveId={contracts[currentIndex].leave_id}
                />
            ) : null} */}

            {/* {PayModal ? (
                // <PayModal onClose={closePayModal} />
            ) : null} */}

        </div>
    );
};

export default PayScheduleTable;
