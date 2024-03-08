import { ChangeEvent, useEffect, useState } from 'react';
import { PayScheduleInterface } from '../../common/interfaces';
import axios from 'axios';
import { APIS } from '../../apis';
import './filter-all.css';
import PrimaryButton from '../UI/PrimaryButton';
import PayModal from '../Modals/PayModal';


const PayScheduleTable = () => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [salary, setSalary] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [tax, setTax] = useState<any>();
    const [totalPaid, setTotalPaid] = useState(0);

    const [allPays, setAllPays] = useState<PayScheduleInterface[] | undefined>()
    const [showPayModal, setShowPayModal] = useState(false)


    useEffect(() => {
        fetchData();
    }, [allPays]);

    useEffect(() => {
        const defaultTotalPaid = allPays?.reduce((acc, pay) => acc + (pay.pay - pay.tax), 0);
        if (defaultTotalPaid) {
            setTotalPaid(defaultTotalPaid);
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(APIS.getAllActiveContracts);
            if (response && response.data) {
                setAllPays(response.data);
            }

        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const closePayModal = () => {
        setShowPayModal(false)
    }

    const openAdvancePayModal = () => {
        setShowPayModal(false)
    }

    const openPayModal = (index: any) => {
        setCurrentIndex(index)
        setShowPayModal(true)
    }

    const handleBonusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const bonusAmount = parseFloat(e.target.value);
        setBonus(bonusAmount);
        let newTotalPaid;
        if (allPays) {
            newTotalPaid = allPays.reduce((acc, pay) => acc + (pay.pay - pay.tax), 0) + bonusAmount;
            setTotalPaid(newTotalPaid);
        }

        const totalPaidElement = document.getElementById('totalPaid') as HTMLInputElement;
        if (newTotalPaid) {
            if (totalPaidElement && !isNaN(newTotalPaid)) {
                totalPaidElement.value = newTotalPaid.toString();
            }
        }
    };

    const handleSalaryChange = (e: any, salary: any) => {



        setSalary(e.target.value);
    };

    const handleTaxChange = (e: any, tax: any) => {
        setTax(e.target.value);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Pay Schedule
                </h4>
                <PrimaryButton onClick={openAdvancePayModal}>Pay In Advance</PrimaryButton>

            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">

                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Month</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Year</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Salary</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Bonus</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Tax Deduction</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Total Paid</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">action</p>
                </div>
            </div>
            {allPays && allPays.map((pay, index) => (
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>

                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{pay.fullName}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{pay.month}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{pay.year}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='number'
                            className="w-40 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => handleSalaryChange(e, pay.pay)}
                            defaultValue={pay.pay}
                            required
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='number'
                            placeholder='Enter Bonus'
                            className="w-40 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => handleBonusChange(e)}
                            required
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='number'
                            className="w-40 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => handleTaxChange(e, pay.tax)}
                            defaultValue={pay.tax}
                            required
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <input
                            type='text'
                            placeholder='Total amount'
                            value={totalPaid}
                            className="w-40 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            readOnly
                            id="totalPaid"
                        />
                    </div>
                    <div className="col-span-1 flex items-center">
                        <PrimaryButton onClick={() => openPayModal(index)}>Pay now</PrimaryButton>
                    </div>
                </div>
            ))}

            {showPayModal && currentIndex !== null && allPays ? (
                <PayModal
                    onClose={closePayModal}
                    fullName={allPays[currentIndex].fullName}
                    amount={salary}
                    userId={allPays[currentIndex].userId}
                    month={allPays[currentIndex].month}
                    year={allPays[currentIndex].year}
                    bonus={bonus}
                    tax={tax}
                    totalPaid={totalPaid}
                />
            ) : null}

        </div>
    );
};

export default PayScheduleTable;
