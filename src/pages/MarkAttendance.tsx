import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import { APIS } from '../apis';
import AttendenceTable from '../components/Attendancetable';
import { AttendanceData, UserData } from '../common/interfaces';



const MarkAttendance: React.FC = () => {
    const [AllAttendances, setAllAttendances] = useState<AttendanceData[]>([]);


    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(APIS.getAllManagers);
                if (response && response.data) {
                    setAllAttendances(response.data);
                }
                console.log(AllAttendances)

            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchData();
    }, []);


    //     const apiUrl = `https://api.example.com/reverse-geocode?lat=${latitude}&lon=${longitude}`;

    //     try {
    //         const response = await fetch(apiUrl);
    //         const data = await response.json();

    //         // Extract the location name from the response.
    //         const locationName = data.results[0]?.formatted_address || 'Unknown Location';
    //         return locationName;
    //     } catch (error) {
    //         console.error('Error fetching location name:', error);
    //         return 'Unknown Location';
    //     }
    // };

    return (
        <>
            <Breadcrumb pageName="Attendance" />

            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: '700px' }}>
                <AttendenceTable data={AllAttendances} />
            </div>
        </>
    );
};

export default MarkAttendance;


