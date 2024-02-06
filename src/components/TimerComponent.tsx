// CountdownTimerComponent.tsx

import { useEffect, useState } from "react";
import { UserData } from "../common/interfaces";
import { APIS } from "../apis";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const TimerComponent = () => {
    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;
    if (userId == 1) {
        return null
    }
    
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
    const isRunning = useSelector((state: RootState) => state.timer.isRunning);

    const checkHours = async () => {
        const user_id = userId;
        const clock_type: string = "CI";

        try {
            const response = await axios.get(APIS.getClockInTime, { params: { user_id, clock_type } });
            const serverClockInTime = new Date(response.data.recent_attendance_time);
            const localClockInTime = new Date();

            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            let timeDifferenceMillis;

            if (userTimeZone !== 'America/New_York') {
                const estClockInTime = new Date(serverClockInTime.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                timeDifferenceMillis = localClockInTime.valueOf() - estClockInTime.valueOf();
            } else {
                timeDifferenceMillis = localClockInTime.valueOf() - serverClockInTime.valueOf();
            }

            // Convert time difference to hh:mm:ss format
            const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifferenceMillis % (1000 * 60)) / 1000);

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } catch (error) {
            console.error('Error fetching clock in time:', error);
            throw error; // Re-throw the error to handle it further if needed
        }
    };


    useEffect(() => {
        let interval: NodeJS.Timeout;

        const updateElapsedSeconds = async () => {
            try {
                const timeDifferenceFormatted = await checkHours();
                const [hours, minutes, seconds] = timeDifferenceFormatted.split(':').map(Number);
                const totalElapsedSeconds = hours * 3600 + minutes * 60 + seconds;
                setElapsedSeconds(totalElapsedSeconds + 1);
            } catch (error) {
                console.error('Error updating elapsed time:', error);
            }
        };

        if (isRunning) {
            updateElapsedSeconds();
            interval = setInterval(updateElapsedSeconds, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);


    const formatTime = (value: number): string => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

   

    return (
        <div className="text-lg text-white">
            <p>Timer {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</p>
        </div>
    );
};

export default TimerComponent;
