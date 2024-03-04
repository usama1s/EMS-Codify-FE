import React, { useEffect, useState } from "react";
import { AssetAllotData, RegisterModalProps, UserData } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";


interface Assets {
    assetId: number;
    title: number
}


const AllotAssetsModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const [users, setUsers] = useState<UserData[] | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<string>('');
    const [assets, setAssets] = useState<Assets[]>([]); // Initialize with an empty array
    const [selectedAssets, setSelectedAssets] = useState<string>('');
    const [pictures, setPictures] = useState<string[]>([]);

    useEffect(() => {
        fetchUsersData();
        fetchAssetsData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await axios.get(APIS.getAllUsers);
            if (response && response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    const fetchAssetsData = async () => {
        try {
            const response = await axios.get(APIS.getAllAssetNotAlloted);
            if (response && response.data) {
                setAssets(response.data);
            }
        } catch (error) {
            console.error('Error fetching assets data:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const data: AssetAllotData = {
            userId: selectedUsers ? parseInt(selectedUsers) : 0, // Convert selectedUsers to number
            assetId: selectedAssets ? parseInt(selectedAssets) : 0, // Convert selectedAssets to number
            pictures: pictures,
        };

        try {
            const response = await axios.post(APIS.allotAsset, data);
            onClose();
            alert(response.data.message);
        } catch (error) {
            console.error('Error allotting asset:', error);
        }
    };



    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUsers(event.target.value);
    };

    const handleAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAssets(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const base64Array: string[] = [];
    
            if (files.length > 2) {
                console.error("Maximum 2 files allowed.");
                return;
            }
    
            // Regular expression to check if file type is JPEG
            const jpegRegex = /^image\/jpeg$/;
    
            const readFile = (index: number) => {
                if (index >= files.length) {
                    setPictures(prevPictures => [...prevPictures, ...base64Array]);
                    return;
                }
    
                const file = files[index];
    
                // Check if file type is JPEG
                if (!jpegRegex.test(file.type)) {
                    console.error(`File ${file.name} is not a JPEG.`);
                    readFile(index + 1);
                    return;
                }
    
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if (reader.result) {
                        base64Array.push(reader.result.toString());
                    }
                    readFile(index + 1);
                };
                reader.onerror = () => {
                    console.error('Failed to read file:', file.name);
                    readFile(index + 1);
                };
            };
    
            readFile(0);
        }
    };
    


    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-25 mb-5">
                <div className="relative top-0 w-1/3">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start bg-black justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Allot Asset
                            </h3>
                        </div>
                        <div className="relative bg-black p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Select Employee</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name="leaveType"
                                        id="leaveType"
                                        value={selectedUsers || ""}
                                        onChange={handleUserChange}
                                    >
                                        <option value="" disabled>Select Employee</option>
                                        {users && users.map(user => (
                                            <option key={user.user_id} value={user.user_id}>
                                                {user.first_name} {user.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Select Asset</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name="leaveType"
                                        id="leaveType"
                                        value={selectedAssets || ""}
                                        onChange={handleAssetChange}
                                    >
                                        <option value="" disabled>Select Asset</option>
                                        {assets && assets.map((asset) => (
                                            <option key={asset.assetId} value={asset.assetId}>
                                                {asset.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Upload Asset Pictures</label>
                                    <input
                                        multiple
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="flex items-center bg-black justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Allot Asset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllotAssetsModal;
