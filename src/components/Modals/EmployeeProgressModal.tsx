import React, { useEffect, useState } from "react";
import { EmployeeProgressModalInterface, UserData } from "../../common/interfaces";
import PrimaryButton from "../UI/PrimaryButton";
import { APIS } from "../../apis";
import axios from "axios";

const EmployeeProgressModal: React.FC<EmployeeProgressModalInterface> = ({ onClose }) => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;

    const [progressItems, setProgressItems] = useState<any[]>([]);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    useEffect(() => {
        if (!dataFetched) {
            fetchData();
            setDataFetched(true);
        }
    }, [dataFetched]);


    const fetchData = async () => {
        try {
            let estdate: any;
            const currentDate = new Date();
            if (currentDate.getTimezoneOffset() !== -300) {
                estdate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            } else {
                estdate = currentDate.toISOString().split('T')[0];
            }
            const date = currentDate?.toISOString().split('T')[0];
            const response = await axios.get(APIS.getClockInTimeByUserIdAndDate, { params: { userId, date } });
            if (response) {
                const time = response.data;
                const [hours, minutes] = time.split(':').map(Number);
                const currentHours = currentDate.getHours();
                const currentMinutes = currentDate.getMinutes();
                let hourIterate = hours + 1;
                let nextHour = 0;
                let nextMinutes = 0;
                let startTime;
                let endTime;
                let prevMinute;
                const newProgressItems = [];
                startTime = hours + ":" + minutes;
                endTime = hourIterate + ":" + nextMinutes;

                for (hourIterate; hourIterate <= currentHours + 1; hourIterate++) {
                    nextHour = hourIterate;
                    const prevHour = nextHour - 1;
                    console.log("current time", currentHours + ":" + currentMinutes);
                    if (nextHour === hours + 1) {
                        prevMinute = minutes;
                    } else {
                        prevMinute = 0;
                    }
                    if (prevHour === currentHours) {
                        nextMinutes = currentMinutes;
                        nextHour = currentHours;
                    }
                    startTime = prevHour + ":" + prevMinute;
                    endTime = nextHour + ":" + nextMinutes;
                    const checkProgress: boolean = await checkIfProgressExists(startTime, endTime, date)
                    if (checkProgress == false) {
                        const newItem = { id: Date.now() + hourIterate, startTime, endTime, title: "", description: "" };
                        newProgressItems.push(newItem);
                    }
                    // console.log("Slot Hour", prevHour, "-", nextHour);
                    // console.log("Slot Minutes", prevMinute, "-", nextMinutes);
                }
                setProgressItems(newProgressItems); // Set the state with the new items
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const checkIfProgressExists = async (startTime: string, endTime: string, date: string) => {
        const data = {
            userId: userId,
            date: date,
            startTime: startTime,
            endTime: endTime
        };
        const response = await axios.post(APIS.checkProgress, data);
        return (response.data)
        // console.log(response.ret);
    }

    const handleClose = async () => {
        onClose();
    };

    const handleTitleChange = (index: number, value: string) => {
        const updatedProgressItems = [...progressItems];
        updatedProgressItems[index].title = value;
        setProgressItems(updatedProgressItems);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedProgressItems = [...progressItems];
        updatedProgressItems[index].description = value;
        setProgressItems(updatedProgressItems);
    };

    const submitProgress = async (index: number) => {
        try {
            const currentDate = new Date();
            const date =
                currentDate.getTimezoneOffset() !== -300
                    ? new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' })).toISOString().split('T')[0]
                    : currentDate.toISOString().split('T')[0];
            const specificItem = progressItems[index];
            const response = await axios.post(APIS.addDailyProgress, [specificItem, userId, date]);
            const userData = response.data;
            return userData;
        } catch (error) {
            throw error;
        }
    };


    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  ">
                <div className=" relative w-2/3 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Enter Daily Progress</h3>
                        </div>
                        <div className=" p-10 bg-black">
                            <h2 className="font-extrabold">Instructions</h2>
                            <ul className="pl-5">
                                <li>Clock in before doing any office related work</li>
                                <li>Progress can only be submitted when the employee is clocked in.</li>
                                <li>If the employee has clocked out he/she wont be able to clock in within 24 hours.</li>
                            </ul>
                        </div>
                        <div className="relative p-6 bg-black">
                            {progressItems.map((item, index) => (
                                <div key={index} className="flex justify-between">
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
                                            value={item.title}
                                            onChange={(e) => handleTitleChange(index, e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-extrabold ">Description:</p>
                                        <textarea
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark.bg-form-input dark:focus:border-primary"
                                            value={item.description}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-10">
                                        <PrimaryButton onClick={() => submitProgress(index)}>Submit Progress</PrimaryButton>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <div className="relative p-6 bg-black">
                            {progressItems.map((item, index) => (
                                <div className="flex justify-between">
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
                                            value={item.title}
                                            onChange={(e) => handleTitleChange(index, e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-extrabold ">Description:</p>
                                        <textarea
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark.bg-form-input dark:focus:border-primary"
                                            value={item.description}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-10">
                                        <PrimaryButton onClick={() => submitProgress(index)}>Submit Progress</PrimaryButton>
                                    </div>
                                </div>
                            ))}
                        </div> */}
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
