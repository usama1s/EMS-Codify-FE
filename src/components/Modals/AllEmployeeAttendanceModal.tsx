
import React, { useEffect, useState } from "react";
import { AllEmployeeAttendanceModalProps } from "../../common/interfaces";
import { APIS } from "../../apis";
import axios from "axios";

const AllEmployeeAttendanceModal: React.FC<AllEmployeeAttendanceModalProps> = (
    { onClose, attendanceId, date, clockin, clockout, clockInPicture, clockOutPicture, last_name, first_name, clockInLocation, clockOutLocation }) => {
    const [progress, setProgress] = useState<any>()

    useEffect(() => {
        fetchProgressDetails();
    }, []);

    const fetchProgressDetails = async () => {
        try {
            const response = await axios.get(APIS.getProgressDetails, { params: { attendanceId, date } });
            if (response && response.data) {
                setProgress(response.data.progress);
            }

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

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
                <div className=" relative w-2/4 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Attendance Detail</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">

                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Name</h2>
                                <p className="text-sm text-black dark:text-white">{first_name} {last_name}</p>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <p className="font-extrabold ">Date</p>
                                <p className="text-sm text-black dark:text-white">{date}</p>

                            </div>
                            <div className="mt-5  items-center justify-between">
                                <h2 className="font-extrabold">Clock In</h2>
                                <div className="mt-3 flex justify-between">
                                    <p className=" ml-5 text-sm text-black dark:text-white">time:</p>
                                    <p className="text-sm text-black dark:text-white">{clockin}</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <p className="ml-5 text-sm text-black dark:text-white">location:</p>
                                    <p className="text-sm text-black dark:text-white">{clockInLocation}</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <p className="ml-5 text-sm text-black dark:text-white"> Clock in image:</p>
                                    {clockInPicture ?
                                        <img src={decodeBase64Image(clockInPicture)} alt="Attendance" className="w-12 h-12 object-cover rounded-full" /> : null
                                    }
                                </div>
                            </div>
                            <div className="mt-5  items-center justify-between">
                                <h2 className="font-extrabold">Clock Out</h2>

                                <div className="mt-3 flex justify-between">
                                    <p className=" ml-5 text-sm text-black dark:text-white">time:</p>
                                    <p className="text-sm text-black dark:text-white">{clockout}</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <p className="ml-5 text-sm text-black dark:text-white">location:</p>
                                    <p className="text-sm text-black dark:text-white">{clockOutLocation}</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <p className="ml-5 text-sm text-black dark:text-white"> Clock out image:</p>
                                    {clockOutPicture ?
                                        <img src={decodeBase64Image(clockOutPicture)} alt="Attendance" className="w-12 h-12 object-cover rounded-full" /> : null
                                    }
                                </div>
                            </div>

                            <div className="mt-5 mb-8">
                                <h2 className="font-extrabold">Progress</h2>
                                <div className="ml-6 mt-2 flex justify-between text-white font-medium">
                                    <div className="col-span-1 hidden items-center sm:flex">
                                        <p>Hours</p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p>Title</p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p>Description</p>
                                    </div>
                                </div>
                                <div className="ml-6 mt-2">

                                    {progress ? (
                                        <>
                                            {progress.map((single_progress: any, index: number) => (
                                                <div className="mt-3 flex justify-between text-white" key={index}>
                                                    <div className="col-span-1 hidden items-center sm:flex">
                                                        <p>{single_progress.start_time} - {single_progress.end_time}</p>
                                                    </div>
                                                    <div className="col-span-1 flex">
                                                        <p>{single_progress.title}</p>
                                                    </div>
                                                    <div className="col-span-1 flex">
                                                        <p>{single_progress.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p>No progress Available</p>
                                    )}

                                </div>
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

export default AllEmployeeAttendanceModal;
