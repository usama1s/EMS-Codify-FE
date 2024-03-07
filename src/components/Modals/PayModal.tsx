
import React from "react";
import { DashboardModalProps } from "../../common/interfaces";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";

const PayModal: React.FC = ({onClose}) => {

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
                <div className=" relative w-1/4 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Pay Amount</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">

                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Name</h2>
                                <p className="text-sm text-black dark:text-white">Anoosh</p>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <p className="font-extrabold ">Date</p>
                                {/* <p className="text-sm text-black dark:text-white">{date}</p> */}

                            </div>
                            <div className="mt-5  items-center justify-between">
                                <h2 className="font-extrabold">Clock In</h2>
                                <div className="mt-3 flex justify-between">
                                    <p className=" ml-5 text-sm text-black dark:text-white">time:</p>
                                    {/* <p className="text-sm text-black dark:text-white">{clockin}</p> */}
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <p className="ml-5 text-sm text-black dark:text-white">location:</p>
                                    <p className="text-sm text-black dark:text-white">location</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <p className="ml-5 text-sm text-black dark:text-white"> Clock in image:</p>
                                    {/* <img src={decodeBase64Image(clockInPicture)} alt="Attendance" className="w-12 h-12 object-cover rounded-full" /> */}
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-6 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
                            <PrimaryButton onClick={handleClose}>Pay </PrimaryButton>
                            <DangerButton onClick={handleClose}>Cancel</DangerButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default PayModal;
