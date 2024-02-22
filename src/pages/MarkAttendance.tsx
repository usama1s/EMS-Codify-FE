import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AttendenceTable from '../components/Tables/Attendancetable';

const MarkAttendance: React.FC = () => {
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


