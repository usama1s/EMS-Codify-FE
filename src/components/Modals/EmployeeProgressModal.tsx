import React, { useEffect, useState } from "react";
import { EmployeeProgressModalInterface, UserData } from "../../common/interfaces";
import PrimaryButton from "../UI/PrimaryButton";
import { APIS } from "../../apis";
import axios from "axios";

const EmployeeProgressModal: React.FC<EmployeeProgressModalInterface> = ({ onClose }) => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;

    const [progressItems, setProgressItems] = useState([{ id: 1, startTime: "7:30", endTime: "8:00", title: "", description: "" }]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentDate = new Date();
    
                if (currentDate.getTimezoneOffset() !== -300) {
                    const estdate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                    const date = estdate.toISOString().split('T')[0];
                    const response = await axios.get(APIS.getClockInTimeByUserIdAndDate, { params: { userId, date } });
                    if (response) {
                        if (response.data) {
                            const time = response.data;
                            const [hours] = time.split(':').map(Number);
                            const nextHour = (hours + 1) % 24;
                            // Update the startTime and endTime of the first item in progressItems
                            setProgressItems(prevState => [{...prevState[0], startTime: time, endTime: `${nextHour.toString().padStart(2, '0')}:00`}, ...prevState.slice(1)]);
                        }
                    }
                } else {
                    const date = currentDate.toISOString().split('T')[0];
                    const response = await axios.get(APIS.getClockInTimeByUserIdAndDate, { params: { userId, date } });
                    if (response) {
                        const time = response.data;
                        const [hours] = time.split(':').map(Number);
                        const nextHour = (hours + 1) % 24;
                        // Update the startTime and endTime of the first item in progressItems
                        setProgressItems(prevState => [{...prevState[0], startTime: time, endTime: `${nextHour.toString().padStart(2, '0')}:00`}, ...prevState.slice(1)]);
                    }
                }
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };
    
        fetchData();
    }, []);


    const addProgressIn = () => {
        const lastItem = progressItems[progressItems.length - 1];
        const startTime = lastItem.endTime;
        const endTime = incrementTimeByMinutes(startTime, 60);
        const newItem = { id: Date.now(), startTime, endTime, title: "", description: "" };
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

    const submitProgress = async () => {
        try {
            const currentDate = new Date();
            if (currentDate.getTimezoneOffset() !== -300) {
                const estdate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                const date = estdate.toISOString().split('T')[0];
                const response = await axios.post(APIS.addDailyProgress, [progressItems, userId, date]);
                const userData = response.data;
                return userData;
            }
            else {
                const date = currentDate.toISOString().split('T')[0];
                const response = await axios.post(APIS.addDailyProgress, [progressItems, userId, date]);
                const userData = response.data;
                return userData;
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-2/3 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Enter Daily Progress</h3>
                            <div className="flex gap-3">
                                <PrimaryButton onClick={addProgressIn}>Add progress</PrimaryButton>
                                <PrimaryButton onClick={submitProgress}>Submit Progress</PrimaryButton>
                            </div>
                        </div>

                        <div className="relative p-6 bg-black">
                            {progressItems.map((item, index) => (
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
