import React, { useState } from "react";
import { RegisterModalProps, UserData } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import { leaveOptions } from "../../constants/constants";
import MessegeModal from "./MessageModal";

const LeaveModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessege] = useState("");



    const [from, setFromDate] = useState<string | null>(null);
    const [till, setTillDate] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 2); // Add 2 days
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 14); // Add 12 days

    const minDateString = minDate.toISOString().split('T')[0];
    const maxDateString = maxDate.toISOString().split('T')[0];

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(event.target.value);
        setTillDate(null);
    };

   
    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTillDate(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataToSend = {
            userId,
            from,
            till,
            category
        };
        applyLeave(dataToSend);

    };

    let maxTillDate: string | undefined;
    if (from) {
        const fromDate = new Date(from);
        const maxDateAllowed = new Date(fromDate);
        maxDateAllowed.setDate(maxDateAllowed.getDate() + 2); // Add 3 days
        maxTillDate = maxDateAllowed.toISOString().split('T')[0];
    }

    const applyLeave = async (data: any) => {
        try {
            const response = await axios.post(APIS.applyLeave, data);
            setMessege(response.data)
            setShowMessageModal(true)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        onClose()
    };

    const closeMessegeModal = () => {
        setShowMessageModal(false)
    };
















    return (
        <>
            <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-25 mb-5" >
                <div className="relative top-0  w-1/3">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start bg-black justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Leave form
                            </h3>
                        </div>
                        <div className="relative bg-black p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="from" className="mb-2 block text-black dark:text-white">From </label>
                                    <input
                                        type="date"
                                        id="from"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={from || ""}
                                        min={minDateString}
                                        max={maxDateString}
                                        onChange={handleStartDateChange}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="till" className="mb-2 block text-black dark:text-white">Till (Select from date first)</label>
                                    <input
                                        type="date"
                                        id="till"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={till || ""}
                                        min={from || minDateString} // Set min to From date if available
                                        max={maxTillDate || maxDateString} // Set max to 3 days after From date if available
                                        onChange={handleEndDateChange}
                                        disabled={!from} // Disable till date if from date is not selected
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Select Category</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                                        name="leaveType"
                                        id="leaveType"
                                        value={category || ""}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {leaveOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center bg-black justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            {showMessageModal ?
                <MessegeModal displayText={message} onClose={closeMessegeModal} otherFunction={onClose} /> : null
            }

        </>
    );
}

export default LeaveModal