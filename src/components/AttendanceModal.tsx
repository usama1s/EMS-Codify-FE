
import React, { useCallback, useRef, useState } from "react";
import { AttendanceModalProps, UserData } from "../common/interfaces";
import Webcam from "react-webcam";
import { attendance } from "../redux/store/slices/attendanceSlice";
import { APIS } from "../apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetTimer, startTimer } from "../redux/store/slices/timerSlice";
import ClockOutWarningModal from "./ClockOutWarningModal";

const AttendanceModal: React.FC<AttendanceModalProps> = ({ onClose }) => {
    const webcamRef = useRef<Webcam>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [hours, setHours] = useState<number | undefined>(undefined);
    const [clockOutData, setClockOutData] = useState<{
        attendance_picture: string;
        location: string;
        user_id: string;
        clock_type: string;
    } | undefined>(undefined);

    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;



    const captureClockOut = useCallback(async () => {
        if (webcamRef.current) {
            const attendance_picture = webcamRef.current.getScreenshot();
            try {
                const location = await getCurrentLocation();
                const hours = await checkHours();


                if (hours !== undefined && hours <= 6) {
                    const clockOutData = {
                        attendance_picture: attendance_picture,
                        location: location,
                        user_id: userId,
                        clock_type: 'CO'
                    };

                    if (hours !== undefined && clockOutData !== undefined) {
                        const { attendance_picture, location, user_id, clock_type } = clockOutData;
                        const sanitizedClockOutData = {
                            attendance_picture: attendance_picture || '',
                            location: location as string,
                            user_id: user_id as unknown as string,
                            clock_type: clock_type as unknown as string,
                        };

                        setHours(hours);
                        setClockOutData(sanitizedClockOutData);
                        setShowModal(true);

                    }
                }
                else {
                    try {
                        const response = await axios.post(APIS.clockOut, clockOutData);
                        handleResetTimer()
                        console.log("API response:", response);
                    } catch (error) {
                        console.error("Error while calling clockOut API:", error);
                    }
                }

            } catch (error) {
                console.error('Error getting live location:', error);
            }
        }
    }, [webcamRef]);


    const checkHours = async () => {
        const user_id = userId;
        const clock_type: string = "CI"
        try {
            const response = await axios.get(APIS.getClockInTime, { params: { user_id, clock_type } });

            // Assuming the response data has a property named 'recent_attendance_time'
            const serverClockInTime = new Date(response.data.recent_attendance_time);

            // Get the current time and date in the local time zone
            const localClockInTime = new Date();

            // Check if the user's time zone is in EST
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // If the user's time zone is not in EST, convert the server time to EST
            if (userTimeZone !== 'America/New_York') {
                const estClockInTime = new Date(serverClockInTime.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                // console.log('Clock in time in EST:', estClockInTime);
                // Calculate the time difference in hours
                const timeDifferenceHours = (localClockInTime.valueOf() - estClockInTime.valueOf()) / (1000 * 60 * 60);
                return timeDifferenceHours;
            } else {
                console.log('Clock in time in local time zone:', serverClockInTime);
                // Calculate the time difference in hours
                const timeDifferenceHours = (localClockInTime.valueOf() - serverClockInTime.valueOf()) / (1000 * 60 * 60);
                return timeDifferenceHours;

            }

        } catch (error) {
            // Handle errors
            console.error('Error fetching clock in time:', error);
        }
    };


    const captureClockIn = useCallback(async () => {
        if (webcamRef.current) {
            const attendance_picture = webcamRef.current.getScreenshot();
            try {
                const location = await getCurrentLocation();

                console.log('Live Location:', location);

                const attendanceData = {
                    attendance_picture: attendance_picture,
                    location: location,
                    user_id: userId,
                    clock_type: 'CI'
                };

                const response = await dispatch(attendance(attendanceData));

                if (response && response.payload) {
                    alert(response.payload.message)
                    handleStartTimer();
                    navigate('/');
                }

                // Do something with the captured image, location, and location name.
            } catch (error) {
                console.error('Error getting live location:', error);
            }
        }
    }, [webcamRef]);



    const handleStartTimer = () => {
        dispatch(startTimer());
    };
    const handleResetTimer = () => {
        dispatch(resetTimer());
    };


    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    error => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    };

    function handleCloseModal(): void {
        setShowModal(false)
    }



    const handleClose = async () => {
        onClose()

    };

    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-1/2 h-2/4 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none ">

                        <div className="relative z-20 h-700 md:h-700 flex flex-col items-center justify-center mt-7">
                            <Webcam
                                audio={false}
                                height={700}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={500}
                                mirrored={false}
                                style={{ transform: "scaleX(-1)" }}
                            />
                            <div className='flex gap-10 mb-10'>
                                <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10" onClick={captureClockIn}>
                                    Clock In
                                </button>
                                <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10" onClick={captureClockOut}>
                                    Clock Out
                                </button>
                            </div>
                            <button className="absolute inline-flex items-center  right-0 bottom-0 rounded-md bg-secondary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-10 mr-10 h-9" onClick={handleClose}>
                                Close
                            </button>
                            {showModal ? (
                                <ClockOutWarningModal isOpen={showModal} hours={hours} clockOutData={clockOutData} onClose={handleCloseModal} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default AttendanceModal;
