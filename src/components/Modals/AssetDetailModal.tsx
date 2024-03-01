
import React from "react";
import { AssetDetailModalProps } from "../../common/interfaces";


const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ onClose, assetId, title, description, company, pictures }) => {

    const handleClose = async () => {
        onClose()
    };


    const decodeBase64Image = (base64String: string) => {
        const decodedString = atob(base64String);
        const byteNumbers = new Array(decodedString.length);
        for (let i = 0; i < decodedString.length; i++) {
            byteNumbers[i] = decodedString.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const dataUrl = URL.createObjectURL(blob);
        return dataUrl;
    };


    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-2/4 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Attendance Detail</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">

                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Asset Tag:</h2>
                                <p className="text-sm text-black dark:text-white">{assetId}</p>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <p className="font-extrabold ">Title:</p>
                                <p className="text-sm text-black dark:text-white">{title}</p>

                            </div>
                            <div className="mt-5  items-center justify-between">
                                <div className="mt-3 flex justify-between">
                                    <h2 className="font-extrabold">Description:</h2>
                                    <p className="text-sm text-black dark:text-white">{description}</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <h2 className="font-extrabold">Company:</h2>

                                    <p className="text-sm text-black dark:text-white">{company}</p>
                                </div>
                                <div className="mt-3 flex justify-between">
                                <h2 className="font-extrabold">Assets Images:</h2>


                                    {pictures && pictures.map((picture, index) => (
                                        picture ? (
                                            <img key={index} src={decodeBase64Image(picture)} className="w-12 h-12 object-cover rounded-full" />
                                        ) : null
                                    ))}



                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default AssetDetailModal;
