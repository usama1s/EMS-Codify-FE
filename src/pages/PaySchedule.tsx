import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AllLeavesTable from '../components/Tables/AllLeavesTable';

const PaySchedule: React.FC = () => {
    return (
        <>
            <Breadcrumb pageName="All Leaves" />

            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: '700px' }}>
                <AllLeavesTable />
            </div>
        </>
    );
};

export default PaySchedule;


