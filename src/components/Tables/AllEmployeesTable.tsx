import { ManagersTableProps } from "../../common/interfaces";

import React, { useState } from 'react';
import RegisterEmployeeModal from "../Modals/RegisterEmployeeModal";
import EmployeeDetailModal from "../Modals/EmployeeDetailModal";
import PrimaryButton from "../UI/PrimaryButton";
import CreateEmployeeContractModal from "../Modals/CreateEmployeeContractModal";



const AllEmployeeTable: React.FC<ManagersTableProps> = ({ data }) => {

    const [showModal, setShowModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showContractModal, setShowContactModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);

    const viewModal = (index: any) => {
        setCurrentIndex(index);
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }
    const closeRegisterModal = () => {
        setShowRegisterModal(false)
    }

    const openRegisterModal = () => {
        setShowRegisterModal(true)
    }
    const openContractModal = () => {
        setShowContactModal(true)
    }
    const closeContractModal = () => {
        setShowContactModal(false)
    }



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Registered Employees List
                </h4>
                <div className="flex gap-6">
                    <PrimaryButton onClick={openContractModal}>Create Employee Contract</PrimaryButton>
                    <PrimaryButton onClick={openRegisterModal}>Register Employee</PrimaryButton>
                </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Email</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-medium">Designation</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Date of Joining</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Employee Detail</p>
                </div>
            </div>
            {data.map((employee, index) => (
                <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{employee.first_name} {employee.last_name}</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">{employee.email}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{employee.designation}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{employee.dateOfJoining}</p>
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
                <EmployeeDetailModal
                    onClose={handleClose}
                    first_name={data[currentIndex].first_name}
                    last_name={data[currentIndex].last_name}
                    email={data[currentIndex].email}
                    designation={data[currentIndex].designation}
                    user_type={data[currentIndex].user_type}
                    dateOfJoining={data[currentIndex].dateOfJoining}
                />
            ) : null}
            {showRegisterModal ? (
                <RegisterEmployeeModal onClose={closeRegisterModal} />
            ) : null}

            {showContractModal ? (
                <CreateEmployeeContractModal onClose={closeContractModal} />
            ) : null}

        </div>
    );
};

export default AllEmployeeTable;
