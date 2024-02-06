import React, { useState } from "react";
import { EmployeeProgressModalInterface } from "../../common/interfaces";
import PrimaryButton from "../UI/PrimaryButton";

const EmployeeProgressModal: React.FC<EmployeeProgressModalInterface> = ({ onClose }) => {
    const [progressItems, setProgressItems] = useState([{ id: 1, startTime: "7:30", endTime: "8:00" }]);

    const addProgressIn = () => {
        // Calculate the end time for the current input based on the last item's end time
        const lastItem = progressItems[progressItems.length - 1];
        const startTime = lastItem.endTime;

        // Calculate the new end time by adding 30 minutes
        const endTime = incrementTimeByMinutes(startTime, 60);

        // Create a new item with start and end times
        const newItem = { id: Date.now(), startTime, endTime };

        // Update the state to add the new item
        setProgressItems([...progressItems, newItem]);
    };

    const incrementTimeByMinutes = (time: string, minutes: number) => {
        const [hoursStr, minutesStr] = time.split(':');
        let hours = parseInt(hoursStr);
        let newMinutes = parseInt(minutesStr) + minutes;

        if (newMinutes >= 60) {
            hours += Math.floor(newMinutes / 60);
            newMinutes %= 60;
        }

        return `${hours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    };
    const handleClose = async () => {
        onClose()
    };

    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-2/3 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Enter Daily Progress</h3>
                            <div className="">
                                <PrimaryButton onClick={addProgressIn}>Add progress</PrimaryButton>
                            </div>
                        </div>

                        <div className="relative p-6 bg-black">
                            {progressItems.map((item) => (
                                <div className="flex justify-between" key={item.id}>
                                    <div>
                                        <p className="font-extrabold">Hours:</p>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            type="text"
                                            value={`${item.startTime} to ${item.endTime}`}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p className="font-extrabold ">Title:</p>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark.bg-form-input dark:focus:border-primary"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-extrabold ">Description:</p>
                                        <textarea
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            ))}

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

export default EmployeeProgressModal;
