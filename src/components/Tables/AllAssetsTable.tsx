import { useEffect, useState } from 'react';
import { AssetTableData } from '../../common/interfaces';
import PrimaryButton from '../UI/PrimaryButton';
import axios from 'axios';
import { APIS } from '../../apis';
import './filter-all.css';
import AddAssetsModal from '../Modals/AddAssetsModal';
import AssetDetailModal from '../Modals/AssetDetailModal';


const AllAssetsTable = () => {
    const [showAddAssetModal, setShowAddAssetModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);
    const [allAssets, setAllAssets] = useState<AssetTableData[]>([]);


    useEffect(() => {
        fetchData();
    }, [allAssets]);

    const fetchData = async () => {
        try {
            const response = await axios.get(APIS.getAllAsset);
            if (response && response.data) {
                setAllAssets(response.data);
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };


    const openAddAssetModal = () => {
        setShowAddAssetModal(true)
    }
    const closeAddAssetModal = () => {
        setShowAddAssetModal(false)

    }

    const viewModal = (index: any) => {
        setCurrentIndex(index);
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    All Company Assets
                </h4>


                <div className=''>
                    <div className='flex gap-8 mb-5'>
                        <PrimaryButton onClick={openAddAssetModal}>Add Assets</PrimaryButton>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Title</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Description</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Assets tag</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Company</p>
                </div>
            </div>
            {allAssets.map((asset, index) => (
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{asset.title}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{asset.description}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{asset.assetId}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{asset.company}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <div className="h-10 w-10 bg-blue-800 text-white ml-10" onClick={() => viewModal(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="view">
                                <path d="M33.5,17.5c-4.4-6-10.2-9-16-9c-5.8,0-11.6,3-16,9C10.3,29.5,24.7,29.5,33.5,17.5z M12.3,12.5c-0.5,0.9-0.8,1.9-0.8,3
                           c0,3.3,2.7,6,6,6s6-2.7,6-6c0-1.1-0.3-2.1-0.8-3c2.5,1,4.9,2.7,7,5c-3.5,3.9-7.7,6-12.1,6c-4.4,0-8.7-2.1-12.2-6
                              C7.4,15.2,9.8,13.5,12.3,12.5z" fill="white"></path>
                            </svg>
                        </div>
                    </div>
                </div>

            ))}
            {showModal && currentIndex !== null ? (
                <AssetDetailModal
                    onClose={handleClose}
                    assetId={allAssets[currentIndex].assetId}
                    title={allAssets[currentIndex].title}
                    description={allAssets[currentIndex].description}
                    company={allAssets[currentIndex].company}
                    pictures={allAssets[currentIndex].pictures}
                />
            ) : null}

            {showAddAssetModal ? (
                <AddAssetsModal onClose={closeAddAssetModal} />
            ) : null}



        </div>
    );
};

export default AllAssetsTable;
