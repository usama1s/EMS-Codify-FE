import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../components/Breadcrumb';
import { registerManager, selectManager } from '../redux/store/slices/managerSlice';
import { useState } from 'react';

const roles = ['Manager1', 'Manager2', 'Manager3'];
const roleValues: Record<string, number> = {
    Manager1: 1,
    Manager2: 2,
    Manager3: 3,
};
const RegisterManager = () => {
    const dispatch = useDispatch();
    const initialFormData = useSelector(selectManager);


    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    const handleRoleChange = (role: string) => {
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(roleValues[role])
                ? prevRoles.filter((r) => r !== roleValues[role])
                : [...prevRoles, roleValues[role]]
        );
    };

    // Use local state to manage the form data
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (field: string, value: string) => {
        // Update the corresponding field in the local state
        setFormData((prevFormData: any) => ({ ...prevFormData, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (formData.password !== formData.confirm_password) {
            alert("Password and Confirm Password do not match!");
            return;
        }

        formData.roles = selectedRoles;
        console.log(formData);

        dispatch(registerManager(formData));
    };

    return (
        <>
            <Breadcrumb pageName="Register" />
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Register Form
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) => handleChange('first_name', e.target.value)}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) => handleChange('last_name', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password should be more than 8 characters"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('password', e.target.value)}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password should be more than 8 characters"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('confirm_password', e.target.value)}
                                />
                            </div>
                            <div className="mb-4.5 flex-wrap">
                                <label className="mb-2.5 block text-black dark:text-white">Role</label>
                                {roles.map((role) => (
                                    <div key={role} className="flex items-center mb-2 mr-4">
                                        <input
                                            type="checkbox"
                                            id={role}
                                            checked={selectedRoles.includes(roleValues[role] as number)}
                                            onChange={() => handleRoleChange(role)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={role} className="text-black dark:text-white">
                                            {role}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('designation', e.target.value)}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Date of joining
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => handleChange('date_of_joining', e.target.value)}
                                />
                            </div>
                            <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterManager;
