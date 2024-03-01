import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectManager } from "../../redux/store/slices/managerSlice";
import { AssetData, RegisterModalProps, UserData } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import { ADD_ASSET_FIELDS } from "../../constants/constants";




const AllotAssetsModal: React.FC<RegisterModalProps> = ({ onClose }) => {

    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState('');
    const [formData, setFormData] = useState(null);


    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await axios.get(APIS.getAllUsers);
            if (response && response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };


    const allotAsset = async (data: any) => {
        try {
            const response = await axios.post(APIS.addAsset, data);
            onClose();
            alert(response.data.message);
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: AssetData = {
            userId: userId ?? 0,
            title: formData.title,
            description: formData.description,
            company: formData.company,
            pictures: [],
        };

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput && fileInput.files) {
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                const base64: any = await convertToBase64(file);
                data.pictures.push(base64);
            }
        }



        await allotAsset(data);
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString());
                } else {
                    reject("Error while reading file");
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };



    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUsers(event.target.value);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-25 mb-5">
                <div className="relative top-0  w-1/3">
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                                        name="leaveType"
                                        id="leaveType"
                                        value={selectedUsers || ""}
                                        onChange={handleUserChange}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {users && users.map(user => (
                                            <option key={user.id} value={user.user_id}>
                                                {user.first_name} {user.last_name}
                                            </option>
                                        ))}


                                    </select>
                                </div>

                                <div className="d-flex">
                                    <div className="d-flex">
                                        <label className="mb-2 block text-black dark:text-white">Upload assets pictures</label>
                                        <input multiple
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            type="file" />
                                    </div>
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
                                        Add Asset
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
