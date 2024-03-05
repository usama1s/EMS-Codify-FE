import React, { useEffect, useState } from "react";
import { RegisterModalProps, UserData } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import { EMPLOYEE_CONTRACT_FIELDS } from "../../constants/constants";
import MessegeModal from "./MessageModal";


const CreateEmployeeContractModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        contract_start_date: '',
        contract_end_date: '',
        pay: '',
    });
    const [employees, setEmployees] = useState<UserData[] | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<string>('');
    const [managers, setManagers] = useState<UserData[] | null>(null);
    const [selectedManager, setSelectedManager] = useState<string>('');
    const [pdfBase64, setPdfBase64] = useState<string | null>(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessege] = useState("");


    useEffect(() => {
        fetchEmployeesData();
        fetchManagersData();
    }, []);

    const fetchEmployeesData = async () => {
        try {
            const response = await axios.get(APIS.getAllEmployeeWithoutActiveContract);
            if (response && response.data) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    const fetchManagersData = async () => {
        try {
            const response = await axios.get(APIS.getAllManagers);
            if (response && response.data) {
                setManagers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    const createContract = async (data: any) => {
        try {
            const response = await axios.post(APIS.createContact, data);
            if (response && response.data.message) {
                setMessege(response.data.message)
                setShowMessageModal(true)
            }
            // return alert(response.data.message);
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            employeeId: selectedEmployee,
            managerId: selectedManager,
            startDate: formData.contract_start_date,
            endDate: formData.contract_end_date,
            pay: formData.pay,
            pdf: pdfBase64,
        }
        // console.log(data);
        createContract(data);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [field]: value }));
        console.log(formData);

    };

    const handleClose = () => {
        onClose()
    };

    const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEmployee(event.target.value);
    };

    const handleManagerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedManager(event.target.value);
    };

    const handlePdfFileChange = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            // Ensure only one file is selected
            if (event.target.files.length > 1) {
                console.error("Please select only one file.");
                return;
            }

            const file = event.target.files[0];
            // Ensure file type is PDF
            if (file.type !== "application/pdf") {
                console.error("Please select a PDF file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const base64String = event.target.result.toString();
                    // Send the base64 string with the extension
                    setPdfBase64(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const closeMessegeModal = () => {
        setShowMessageModal(false)
    };


    return (
        <>
            <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-25 mb-5" >
                <div className="relative top-0  w-1/3">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start bg-black justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Create Contract
                            </h3>
                        </div>
                        <div className="relative bg-black p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Select Employee</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name="employee_id"
                                        id="employee_id"
                                        value={selectedEmployee || ""}
                                        onChange={handleEmployeeChange}
                                    >
                                        <option value="" disabled>Select Employee</option>
                                        {employees && employees.map(employee => (
                                            <option key={employee.user_id} value={employee.user_id}>
                                                {employee.first_name} {employee.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Select Reporting Manager</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name="manager_id"
                                        id="manager_id"
                                        value={selectedManager || ""}
                                        onChange={handleManagerChange}
                                    >
                                        <option value="" disabled>Select Manager</option>
                                        {managers && managers.map(manager => (
                                            <option key={manager.user_id} value={manager.user_id}>
                                                {manager.first_name} {manager.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {EMPLOYEE_CONTRACT_FIELDS.map((field, index) => (
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

                                <div className="mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Upload Contract PDF</label>
                                    <input
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        type="file"
                                        onChange={handlePdfFileChange}
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
                                        Create Contact
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            {showMessageModal ?
                <MessegeModal displayText={message} onClose={closeMessegeModal} otherFunction={onClose} /> : null
            }

        </>
    );
}

export default CreateEmployeeContractModal