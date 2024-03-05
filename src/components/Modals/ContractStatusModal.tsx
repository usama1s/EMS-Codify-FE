
import React from "react";
import { ContratStatusModalProps } from "../../common/interfaces";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";

const ContractStatusModal: React.FC<ContratStatusModalProps> = ({ onClose, otherFunction }) => {

    const handleClose = async () => {
        onClose()

        //Made For Attendance modal to close
        otherFunction()
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-auto my-6 mx-auto max-w-sm ">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-3xl font-semibold text-white ">Change Contract Status</h3>
                        </div>

                        <div className="relative p-6 flex-auto bg-black">
                            <div className="ml-10 flex gap-20">
                                <PrimaryButton onClick={handleClose}>Expired</PrimaryButton>
                                <DangerButton onClick={handleClose}>Terminate</DangerButton>
                            </div>

                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
                            <PrimaryButton onClick={handleClose}>OK</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default ContractStatusModal;
