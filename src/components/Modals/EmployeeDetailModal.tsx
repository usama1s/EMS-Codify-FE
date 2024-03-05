
import React, { useEffect, useState } from "react";
import { ContractsInterface, EmployeeDetailModalProps } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import PrimaryButton from "../UI/PrimaryButton";
import ContractStatusModal from "./ContractStatusModal";

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ onClose, user_id, first_name, last_name, email, dateOfJoining, designation }) => {

    const [contracts, setContracts] = useState<ContractsInterface>()
    const [showContractModal, setShowContactModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(APIS.getAllUserContracts, { params: { userId: user_id } });
                if (response && response.data) {
                    setContracts(response.data);
                }

            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchData();
    }, []);


    const handleClose = async () => {
        onClose()
    };

    const openModalFromStatusChange = async () => {
        setShowContactModal(true)
    };
    const closeModalFromStatusChange = async () => {
        setShowContactModal(false)
    };

    const viewPdf = (pdfBase64: string) => {
        const pdfWindow = window.open("");
        if (pdfWindow) {
            pdfWindow.document.write(
                `<iframe width='100%' height='100%' src='data:application/pdf;base64,${pdfBase64}'></iframe>`
            );
        } else {
            alert('Opening the PDF was blocked. Please check your browser settings.');
        }
    };



    return (
        <>
            <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-1/3 h-96 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
                            <h3 className="text-2xl font-semibold text-white ">Employee Detail</h3>
                        </div>

                        <div className="relative p-6 bg-black">

                            <div className="flex justify-between">
                                <h2 className="font-extrabold">Fullname:</h2>
                                <p className="text-sm text-black dark:text-white">{first_name} {last_name}</p>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <p className="font-extrabold ">Email:</p>
                                <p className="text-sm text-black dark:text-white">{email}</p>

                            </div>
                            <div className="mt-5 flex justify-between">
                                <p className=" font-extrabold ">Date of joining:</p>
                                <p className="text-sm text-black dark:text-white">{dateOfJoining}</p>
                            </div>
                            <div className="mt-5 flex justify-between">
                                <p className=" font-extrabold ">Designation</p>
                                <p className="text-sm text-black dark:text-white">{designation}</p>
                            </div>
                        </div>
                        <div className="bg-black">
                            <table>
                                <thead>
                                    <tr className="">
                                        <th>Reporting Manager</th>
                                        <th>Contract Start</th>
                                        <th>Contract End</th>
                                        <th>Pay</th>
                                        <th>Contract Status</th>
                                        <th>Contract Pdf</th>
                                        <th>Change Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts && contracts.map((contract, index) => (
                                        <tr key={index}>
                                            <td>{contract.reportingManager}</td>
                                            <td>{contract.contractStartDate}</td>
                                            <td>{contract.contractEndDate}</td>
                                            <td>{contract.pay}</td>
                                            <td>
                                                {contract.contractStatus === 1 ? 'Active' :
                                                    contract.contractStatus === 2 ? 'Terminated' :
                                                        contract.contractStatus === 3 ? 'Expired' : ''}
                                            </td>
                                            <td>
                                                <button onClick={() => viewPdf(contract.pdf)}>View PDF</button>
                                            </td>
                                            <td>
                                                <PrimaryButton onClick={openModalFromStatusChange}>Change Status</PrimaryButton>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
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

            {showContractModal ?
                <ContractStatusModal onClose={closeModalFromStatusChange} otherFunction={onClose} /> : null
            }

        </>
    );
};

export default EmployeeDetailModal;
