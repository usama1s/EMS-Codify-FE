import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectManager } from "../../redux/store/slices/managerSlice";
import { RegisterModalProps } from "../../common/interfaces";
import axios from "axios";
import { APIS } from "../../apis";
import { REGISTER_EMPLOYEE_FIELDS } from "../../constants/constants";


// const roles: any[] = [
//     'Employee/Intern Attendence',
//     'Leave Approvel',
//     'Daily Progress',
//     'Pay Schedule',
//     'Employee Data',
//     'Office Decorum'
// ];

// const roleValues: Record<string, number> = {
//     'Employee/Intern Attendence': 1,
//     'Leave Approvel': 2,
//     'Daily Progress': 3,
//     'Pay Schedule': 4,
//     'Employee Data': 5,
//     'Office Decorum': 6
// };


const RegisterEmployeeModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const initialFormData = useSelector(selectManager);
    const [formData, setFormData] = useState(initialFormData);
    // const [Managers, seManagers] = useState<ManagerInterface[]>([]);

    // const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    // const userDataString = localStorage.getItem('userData');
    // const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
    // const userType: number | null = userData ? userData.user_type : null;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(APIS.getAllManagers);
    //             if (response && response.data) {
    //                 seManagers(response.data);
    //             }
    //             console.log(Managers)

    //         } catch (error) {
    //             console.error('Error fetching attendance data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    const registerEmployee = async (data: any) => {
        try {
            const response = await axios.post(APIS.registerEmployee, data);
            onClose();
            return alert(response.data.message);
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

        console.log(formData);

        registerEmployee(formData);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [field]: value }));
    };

    const handleClose = () => {
        onClose()
    };

    return (
        <>
            <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-25 mb-5" >
                <div className="relative top-0  w-1/3">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start bg-black justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Register Employee
                            </h3>
                        </div>
                        <div className="relative bg-black p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                {REGISTER_EMPLOYEE_FIELDS.map((field, index) => (
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
                                {/* <div className="mt-3">
                                    <label className="mb-2 block text-black dark:text-white">Reporting Manager</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name=""
                                        id="">
                                        <option >Select Manager</option>
                                        {Managers?.map((manager: any, index: any) => (
                                            <option value={manager?.user_id} >{manager?.first_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-3 mb-5">
                                    <label className="mb-2 block text-black dark:text-white">Contract Status</label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name=""
                                        id="">
                                        <option value={1} >Active</option>
                                        <option value={2} >Terminated</option>
                                        <option value={3}>Finished</option>
                                    </select>
                                </div> */}
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

export default RegisterEmployeeModal