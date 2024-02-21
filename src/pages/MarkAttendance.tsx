import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AttendenceTable from '../components/Tables/Attendancetable';



const MarkAttendance: React.FC = () => {
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
                <AttendenceTable />
            </div>
        </>
    );
};

export default MarkAttendance;


