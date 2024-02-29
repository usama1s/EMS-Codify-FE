import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AllAssetsTable from '../components/Tables/AllAssetsTable';
import AllottedAssetsTable from '../components/Tables/AllottedAssetsTable';


const AssetManagement: React.FC = () => {

    const [showAllAssetsTable, setShowAllAssetsTable] = useState(true);
    const [showAllottedAssetstable, setShowAllottedAssetstable] = useState(false);

    const handleShowLeaves = () => {
        setShowAllottedAssetstable(true)
        setShowAllAssetsTable(false)

    };
    const handleAllAssetsTable = () => {
        setShowAllAssetsTable(true)
        setShowAllottedAssetstable(false)

    };



    return (
        <>
            <>
                <div className='flex gap-5'>
                    <div onClick={handleAllAssetsTable}>
                        <Breadcrumb pageName="All Assest" />
                    </div>
                    <div className='border-l solid-white pl-5 mb-5' onClick={handleShowLeaves}>
                        <Breadcrumb pageName="Alotted Assets" />
                    </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: '700px' }}>
                    {showAllAssetsTable ?
                        <AllAssetsTable /> : null
                    }
                    {showAllottedAssetstable ?
                        <AllottedAssetsTable /> : null
                    }
                </div>
            </>
        </>
    );
};

export default AssetManagement;


