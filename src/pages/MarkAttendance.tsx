import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AttendenceTable from '../components/Tables/Attendancetable';
import AppliedLeavesTable from '../components/Tables/AppliedLeavesTable';

const MarkAttendance: React.FC = () => {
    const [showAttendencetable, setshowAttendencetable] = useState(true);
    const [showLeavetable, setshowLeavetable] = useState(false);

    const handleShowLeaves = () => {
        setshowLeavetable(true)
        setshowAttendencetable(false)

    };
    const handleShowAttendance = () => {
        setshowAttendencetable(true)
        setshowLeavetable(false)

    };


    return (
        <>
            <div className='flex gap-5'>
                <div onClick={handleShowAttendance}>
                    <Breadcrumb pageName="Attendance" />
                </div>
                <div className='border-l solid-white pl-5 mb-5' onClick={handleShowLeaves}>
                    <Breadcrumb pageName="Leaves" />
                </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: '700px' }}>
                {showAttendencetable ?
                    <AttendenceTable /> : null
                }
                {showLeavetable ?
                    <AppliedLeavesTable /> : null
                }
            </div>
        </>
    );
};

export default MarkAttendance;


