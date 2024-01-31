import axios from "axios";
import React from "react";
import { APIS } from "../apis";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "../common/interfaces";
import { resetTimer } from '../redux/store/slices/timerSlice';
import { useDispatch } from "react-redux";



const Modal: React.FC<ModalProps> = ({ hours, clockOutData, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleYesClick = async () => {
        if (clockOutData) {
            try {
                const response = await axios.post(APIS.clockOut, clockOutData);
                if (response && response.data) {
                    alert(response.data.message)
                    handleResetTimer()
                    onClose()
                    navigate('/');
                }
            } catch (error) {
                console.error("Error while calling clockOut API:", error);
            }
        }
    };
    const handleNoClick = async () => {
        onClose()
    };
    const handleResetTimer = () => {
        dispatch(resetTimer());
    };


    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-auto my-6 mx-auto max-w-sm ">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-3xl font-semibold text-white ">Are You Sure</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">
                            <p className="my-4 text-white-500 text-lg leading-relaxed ">
                                It has been {hours?.toFixed(2)} hours, are you sure you wan to clock out
                            </p>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleYesClick}
                            >
                                Yes
                            </button>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleNoClick}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Modal;
