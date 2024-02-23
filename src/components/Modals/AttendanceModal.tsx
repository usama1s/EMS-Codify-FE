
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AttendanceModalProps, UserData } from "../../common/interfaces";
import Webcam from "react-webcam";
import { attendance } from "../../redux/store/slices/attendanceSlice";
import { APIS } from "../../apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetTimer, startTimer } from "../../redux/store/slices/timerSlice";
import ClockOutWarningModal from "./ClockOutWarningModal";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import SecondaryButton from "../UI/SecondaryButton";
import MessegeModal from "./MessageModal";

const AttendanceModal: React.FC<AttendanceModalProps> = ({ onClose }) => {

    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;


    const webcamRef = useRef<Webcam>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessege] = useState("");
    const [showClockInButton, setShowClockInButton] = useState(true);
    const [showClockOutButton, setShowClockOutButton] = useState(false);
    const [hours, setHours] = useState<number | undefined>(undefined);
    const [clockOutData, setClockOutData] = useState<{
        attendance_picture: string;
        location: string;
        user_id: string;
        clock_type: string;
    } | undefined>(undefined);


    useEffect(() => {
        checkClockStatus()
    }, []);

    const checkClockStatus = async () => {
        try {
            const currentDate = new Date();
            let date
            if (currentDate.getTimezoneOffset() !== -300) {
                const estdate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                date = estdate.toISOString().split('T')[0];
            } else {
                date = currentDate.toISOString().split('T')[0];
            }
            const response = await axios.get(APIS.getCLockInStatusByUserIdAndDate, { params: { userId, date } });
            if (response && response.data.clock_type == 'CI') {
                setShowClockInButton(false);
                setShowClockOutButton(true);
            } else if (response && response.data.clock_type == 'CO') {
                setShowClockInButton(true);
                setShowClockOutButton(false);
            }

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    }

    const captureClockOut = useCallback(async () => {
        if (webcamRef.current) {
            const attendance_picture = webcamRef.current.getScreenshot();
            try {
                const location = await getCurrentLocation();
                const hours = await checkHours();
                const progress = await isProgressEntered();

                if (progress == true) {

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
                }else{
                    setMessege('Enter your daily progress first')
                    setShowMessageModal(true)
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
                const timeDifferenceHours = (localClockInTime.valueOf() - estClockInTime.valueOf()) / (1000 * 60 * 60);
                return timeDifferenceHours;
            } else {
                const timeDifferenceHours = (localClockInTime.valueOf() - serverClockInTime.valueOf()) / (1000 * 60 * 60);
                return timeDifferenceHours;
            }

        } catch (error) {
            // Handle errors
            console.error('Error fetching clock in time:', error);
        }
    };


    const isProgressEntered = async () => {
        try {
            const currentDate = new Date();
            let estdate: any;
            let allStartTime: any = []
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
                let startTime: string;
                let endTime: string;
                let prevMinute;
                startTime = hours + ":" + minutes;
                endTime = hourIterate + ":" + nextMinutes;
                for (hourIterate; hourIterate <= currentHours + 1; hourIterate++) {
                    nextHour = hourIterate;
                    const prevHour = nextHour - 1;
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
                    allStartTime.push(startTime)
                }
                const checkAllProgressEntered: any = await checkProgressEntered(allStartTime, date)
                return checkAllProgressEntered
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const checkProgressEntered = async (allStartTime: any, date: string) => {
        const response = await axios.get(APIS.checkAllProgressEntered, { params: { userId, date, allStartTime } });
        return (response.data)
    }


    const captureClockIn = useCallback(async () => {
        if (webcamRef.current) {
            const attendance_picture = webcamRef.current.getScreenshot();
            try {
                const location = await getCurrentLocation();
                const attendanceData = {
                    attendance_picture: attendance_picture,
                    location: location,
                    user_id: userId,
                    clock_type: 'CI'
                };

                const response = await dispatch(attendance(attendanceData));

                if (response && response.payload) {
                    setMessege(response.payload.message)
                    setShowMessageModal(true)
                    // alert()
                    handleStartTimer();
                    navigate('/attendance');
                }
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
    const closeMessegeModal = async () => {
        setShowMessageModal(false)
    };

    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-1/2 h-2/4">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none ">

                        <div className="relative z-20 h-700 md:h-700 flex flex-col items-center justify-center mt-8">
                            <Webcam
                                audio={false}
                                height={700}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={500}
                                mirrored={false}
                                style={{ transform: "scaleX(-1)" }}
                            />
                            <div className='flex gap-10 mb-10 mt-10'>
                                {showClockInButton ?
                                    <PrimaryButton onClick={captureClockIn}>Clock In</PrimaryButton> : null
                                }
                                {showClockOutButton ?
                                    <DangerButton onClick={captureClockOut}>Clock Out</DangerButton> : null
                                }
                            </div>
                            <SecondaryButton onClick={handleClose}>Close</SecondaryButton>

                            {showModal ? (
                                <ClockOutWarningModal isOpen={showModal} hours={hours} clockOutData={clockOutData} onClose={handleCloseModal} handleClockOutOk={function (): void { }} otherFunction={function (): void { onClose }} />
                            ) : null}
                        </div>

                        <div className=" p-10 bg-black">
                            <h2 className="font-extrabold">Instructions</h2>
                            <ul className="pl-5">
                                <li>Clock in before doing any office related work</li>
                                <li>Progress can only be submitted when the employee is clocked in.</li>
                                <li>If the employee has clocked out he/she wont be able to clock in within 24 hours.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            {showMessageModal ?
                <MessegeModal displayText={message} onClose={closeMessegeModal} otherFunction={onClose} /> : null
            }

        </>
    );
};

export default AttendanceModal;
