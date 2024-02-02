import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectManager } from "../redux/store/slices/managerSlice";
import { RegisterModalProps, UserData } from "../common/interfaces";
import axios from "axios";
import { APIS } from "../apis";


const roles: any[] = [
    'Employee/Intern Attendence',
    'Leave Approvel',
    'Daily Progress',
    'Pay Schedule',
    'Employee Data',
    'Office Decorum'
];

const roleValues: Record<string, number> = {
    'Employee/Intern Attendence': 1,
    'Leave Approvel': 2,
    'Daily Progress': 3,
    'Pay Schedule': 4,
    'Employee Data': 5,
    'Office Decorum': 6
};

const inputFields = [
    {
        name: 'first_name',
        type: 'text',
        placeholder: 'Enter your first name',
        label: 'First Name',
    },
    {
        name: 'last_name',
        type: 'text',
        placeholder: 'Enter your last name',
        label: 'Last Name',
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email address',
        label: 'Email',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Password should be more than 8 characters',
        label: 'Password',
    },
    {
        name: 'confirm_password',
        type: 'password',
        placeholder: 'Password should be more than 8 characters',
        label: 'Confirm Password',
    },
    {
        name: 'designation',
        type: 'text',
        placeholder: 'Employee designation',
        label: 'Designation',
    },
    {
        name: 'date_of_joining',
        type: 'date',
        placeholder: 'Employee designation',
        label: 'Date Of Joining',
    },
];
const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const initialFormData = useSelector(selectManager);
    const [formData, setFormData] = useState(initialFormData);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    const userDataString = localStorage.getItem('userData');
    const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    const userType: number | null = userData ? userData.user_type : null;


    const registerManager = async (data: any) => {
        try {
            const response = await axios.post(APIS.registerManager, data);
            onClose();
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (formData.password !== formData.confirm_password) {
            alert("Password and Confirm Password do not match!");
            return;
        }

        // Map selected roles to their corresponding numbers
        const selectedRoleValues = selectedRoles.map(role => roleValues[role]);

        // Update formData.roles with the selectedRoleValues array
        formData.roles = selectedRoleValues;

        console.log(formData);

        registerManager(formData);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [field]: value }));
    };

    const handleClose = () => {
        onClose()
    };

    const handleCheckboxChange = (role: number) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((selectedRole) => selectedRole !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    return (
        <>
            <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-25 mb-5" >
                <div className="relative top-0  w-1/3">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start bg-black justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Register Manager
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative bg-black p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                {inputFields.map((field, index) => (
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
                                {userType !== 2 && (
                                    <div className="relative mb-4.5 flex flex-col">
                                        <label className="mb-3 block text-black dark:text-white">Assign roles</label>
                                        {roles.map((role) => (
                                            <label key={role}>
                                                <input
                                                    type="checkbox"
                                                    value={roleValues[role]}
                                                    className="mb-3 ml-4"
                                                    checked={selectedRoles.includes(role)}
                                                    onChange={() => handleCheckboxChange(role)}
                                                />
                                                {role}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center bg-black justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}

export default RegisterModal