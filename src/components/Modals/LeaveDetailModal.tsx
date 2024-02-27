
import React from "react";
import { LeaveDetailModalProps } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";

const LeaveDetailModal: React.FC<LeaveDetailModalProps> = ({ onClose, firstName, lastName, fromDate, tillDate, leaveCategory, leaveStatus, leaveId }) => {

    const handleClose = async () => {
        onClose()
    };
    const handleAccept = async () => {
        const status = 2
        updateStatus(status)
        onClose()
    };

    const handleReject = async () => {
        const status = 3
        updateStatus(status)
        onClose()
    };

    const updateStatus = async (status: number) => {
        try {
            const response = await axios.put(APIS.updateLeaveStatus, { leaveId, status });
            if (response && response.data) {

            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-1/4 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Attendance Detail</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">

                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Name:</h2>
                                <p className="text-sm text-black dark:text-white">{firstName} {lastName}</p>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="font-extrabold">From:</h2>
                                <p className="text-sm text-black dark:text-white">{fromDate}</p>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Till:</h2>
                                <p className="text-sm text-black dark:text-white">{tillDate}</p>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Reason:</h2>
                                <p className="text-sm text-black dark:text-white">{leaveCategory}</p>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Status:</h2>
                                <p className="text-sm text-black dark:text-white">{leaveStatus}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleAccept}
                            >
                                Accept
                            </button>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleReject}
                            >
                                Reject
                            </button>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default LeaveDetailModal;
