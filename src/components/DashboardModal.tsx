
import React from "react";
import { DashboardModalProps } from "../common/interfaces";

const DashboardModal: React.FC<DashboardModalProps> = ({ onClose, date, clockin, clockout, picture }) => {

    const handleClose = async () => {
        onClose()
    };


    const decodeBase64Image = (base64String: string) => {
        const decodedString = atob(base64String);
        const byteNumbers = new Array(decodedString.length);
        for (let i = 0; i < decodedString.length; i++) {
            byteNumbers[i] = decodedString.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const dataUrl = URL.createObjectURL(blob);
        return dataUrl;
    };


    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-130 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-3xl font-semibold text-white ">Attendance Detail</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">
                            <div className="flex gap-11">
                                <div className="pr-10 flex items-center">
                                    <p className="font-extrabold ">Date</p>
                                </div>
                                <div className=" flex items-center">
                                    <p className="font-extrabold">Clock In</p>
                                </div>
                                <div className=" flex items-center">
                                    <p className="font-extrabold">Clock Out</p>
                                </div>
                                <div className=" flex items-center">
                                    <p className="font-extrabold">Picture</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 bg-black">
                            <div className="pr-1 flex items-center">
                                <p className="text-sm text-black dark:text-white">{date}</p>
                            </div>
                            <div className="pr-5 flex items-center">
                                <p className="text-sm text-black dark:text-white">{clockin}</p>
                            </div>
                            <div className="pr-8 flex items-center">
                                <p className="text-sm text-black dark:text-white">{clockout}</p>
                            </div>
                            <div className=" flex items-center">
                                <img src={decodeBase64Image(picture)} alt="Attendance" className="w-12 h-12 object-cover rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
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

export default DashboardModal;
