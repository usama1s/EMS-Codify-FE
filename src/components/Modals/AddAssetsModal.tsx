import React, { useState } from "react";
import { AssetData, RegisterModalProps, UserData } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import { ADD_ASSET_FIELDS } from "../../constants/constants";




const AddAssetsModal: React.FC<RegisterModalProps> = ({ onClose }) => {

    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userId: number | null = userData ? userData.user_id : null;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        adding_date: ''
    });

    const addAsset = async (data: any) => {
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

        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        const files = fileInput.files;

        if (!files) {
            // Handle case where files are not selected
            return;
        }

        if (files.length > 7) {
            // Handle case where more than 7 files are selected
            console.error("Maximum 7 files allowed.");
            return;
        }

        const data: AssetData = {
            userId: userId ?? 0,
            title: formData.title,
            description: formData.description,
            company: formData.company,
            date: formData.adding_date,
            pictures: [],
        };

        // Regular expression to check if file type is JPEG
        const jpegRegex = /^image\/jpeg$/;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Check if file type is JPEG
            if (!jpegRegex.test(file.type)) {
                console.error(`File ${file.name} is not a JPEG.`);
                continue;
            }

            // Convert file to base64
            const base64: any = await convertToBase64(file);
            data.pictures.push(base64);
        }

        // console.log(data);

        await addAsset(data);
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



    const handleChange = (field: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [field]: value }));
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
                                Add Assets Detail
                            </h3>
                        </div>
                        <div className="relative bg-black p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                {ADD_ASSET_FIELDS.map((field, index) => (
                                    <div key={index} className="mb-4.5">
                                        <label className="mb-2 block text-black dark:text-white">{field.label}</label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div className="d-flex">
                                    <div className="d-flex">
                                        <label className="mb-2 block text-black dark:text-white">Asset Description</label>
                                        <textarea
                                            name="description"
                                            placeholder="Add Asset Description"
                                            value={formData.description} 
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={(e) => handleChange("description", e.target.value)} 
                                        />

                                    </div>
                                </div>

                                <div className="d-flex">
                                    <div className="d-flex">
                                        <label className="mb-2 block text-black dark:text-white">Upload assets pictures ( maximum 7 pictures )</label>
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

export default AddAssetsModal;
