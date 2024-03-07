import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import PayScheduleTable from '../components/Tables/PayScheduleTable';

const PaySchedule: React.FC = () => {
    return (
        <>
            <Breadcrumb pageName="Payments" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: '700px' }}>
                <PayScheduleTable />
            </div>
        </>
    );
};

export default PaySchedule;


