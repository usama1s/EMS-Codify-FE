
import React from "react";
import { ContratStatusModalProps } from "../../common/interfaces";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import axios from "axios";
import { APIS } from "../../apis";

const ContractStatusModal: React.FC<ContratStatusModalProps> = ({ contractId, onClose }) => {

    const handleClose = async () => {
        onClose()


        // otherFunction()
    };
    const handleExpire = async () => {
        try {
            let status = 3
            const response = await axios.put(APIS.changeContactStatus, { contractId, status });
            if (response && response.data.message) {
                console.log(response.data.message)
                onClose()
            }

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }

    };
    const handleTerminate = async () => {
        try {
            let status = 2
            const response = await axios.put(APIS.changeContactStatus, { contractId, status });
            if (response && response.data.message) {
                console.log(response.data.message)
                onClose()

            }

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
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
                                <PrimaryButton onClick={handleExpire}>Expired</PrimaryButton>
                                <DangerButton onClick={handleTerminate}>Terminate</DangerButton>
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
