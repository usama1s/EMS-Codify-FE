import React, { useState } from "react";
import { RegisterModalProps, UserData } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import { APPLY_LEAVE_FIELDS, leaveOptions } from "../../constants/constants";
import MessegeModal from "./MessageModal";

const LeaveModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessege] = useState("");
    const [formData, setFormData] = useState({
        from: '',
        till: '',
        category: '',
    });




    const applyLeave = async (data: any) => {
        try {
            const response = await axios.post(APIS.applyLeave, data);
            setMessege(response.data)
            setShowMessageModal(true)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);
        if (!formData.from || !formData.till || !formData.category) {
            alert('Please fill out all fields');
            return;
        }


        const dataWithUserId = {
            userId: userId,
            ...formData
        };
        applyLeave(dataWithUserId);
    };


    const handleChange = (name: string, value: string) => {
        if (name === 'from') {
            const selectedFromDate = new Date(value);
            const maxDate = new Date(selectedFromDate);
            maxDate.setDate(selectedFromDate.getDate() + 12);

            if (selectedFromDate < new Date() || selectedFromDate > maxDate) {
                alert('Selected from date should be between today and 12 days from today.');
                return;
            }

            formData.from = value;

            // Adjust till date if it's before new from date
            if (formData.till && new Date(formData.till) < selectedFromDate) {
                formData.till = ''; // Reset till date if it's before the new from date
            }
        }

        if (name === 'till') {
            const selectedTillDate = new Date(value);
            const minDate = new Date(formData.from);
            minDate.setDate(minDate.getDate() + 1); // Next day after from date
            const maxDate = new Date(minDate);
            maxDate.setDate(minDate.getDate() + 12); // 12 days after from date

            if (selectedTillDate < minDate || selectedTillDate > maxDate) {
                alert('Selected till date should be between 1 and 12 days after the from date.');
                return;
            }

            formData.till = value;
        }

        setFormData({
            ...formData,
            [name]: value
        });
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
                                {APPLY_LEAVE_FIELDS.map((field, index) => (
                                    <div key={index} className="mb-4.5">
                                        <label className="mb-2 block text-black dark:text-white">{field.label}</label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Select Category</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                                        name="leaveType"
                                        id="leaveType"
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
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