import axios from "axios";
import React, { useState } from "react";
import { APIS } from "../apis";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    hours?: number;
    clockOutData?: {
        attendance_picture: string;
        location: string;
        user_id: string;
    };
}

const Modal: React.FC<ModalProps> = ({ isOpen, hours, clockOutData }) => {
    const [showModal, setShowModal] = useState(false);

    const handleYesClick = async () => {
        if (clockOutData) {
            try {
                const response = await axios.post(APIS.clockOut, clockOutData);
                console.log("API response:", response);
                // You can handle the response or update state as needed
            } catch (error) {
                console.error("Error while calling clockOut API:", error);
                // Handle the error as needed
            }
        }
    };
    const handleNoClick = async () => {
        setShowModal(false)
    };


    return (
        <>
            {/* <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Open small modal
            </button> */}

            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">

                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Are You Sure</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                </button>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                    I always felt like I could do anything. That’s the main
                                    thing people are controlled by! Thoughts- their perception
                                    of themselves! They're slowed down by their perception of
                                    themselves. If you're taught you can’t do anything, you
                                    won’t do anything. I was taught I could do everything.
                                </p>
                            </div>

                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleYesClick}
                                >
                                    Yes
                                </button>
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleNoClick}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>

        </>
    );
};

export default Modal;
