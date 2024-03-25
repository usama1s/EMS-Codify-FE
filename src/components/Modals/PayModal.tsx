import React, { useState } from 'react';
import { PayModalProps } from '../../common/interfaces';
import DangerButton from '../UI/DangerButton';
import axios from 'axios';
import { APIS } from '../../apis';
import PrimaryButton from '../UI/PrimaryButton';

const PayModal: React.FC<PayModalProps> = ({
  onClose,
  fullName,
  amount,
  month,
  tax,
  totalPaid,
  bonus,
  userId,
  year,
}) => {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  const handleClose = async () => {
    onClose();
  };
  const handlePayNow = async () => {
    const salaryDetail = {
      fullName,
      amount,
      month,
      year,
      tax,
      totalPaid,
      bonus,
      userId,
      pdfBase64,
    };
    console.log(salaryDetail);

    try {
      const response = await axios.post(APIS.paySalary, salaryDetail);
      if (response) {
        onClose();
      }
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handlePdfFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      // Ensure only one file is selected
      if (event.target.files.length > 1) {
        console.error('Please select only one file.');
        return;
      }

      const file = event.target.files[0];
      // Ensure file type is PDF
      if (file.type !== 'application/pdf') {
        console.error('Please select a PDF file.');
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

  return (
    <>
      <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className=" relative w-1/4 h-96 ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
              <h3 className="text-2xl font-semibold text-white ">Pay Amount</h3>
            </div>

            <div className="relative p-3 flex-auto bg-black">
              <div className="mt-5  items-center justify-between">
                <h2 className="font-extrabold">Salary Detail</h2>
                <div className="mt-3 flex justify-between">
                  <p className=" ml-5 text-sm text-black dark:text-white">
                    Full name:
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {fullName}
                  </p>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Month:
                  </p>
                  <p className="text-sm text-black dark:text-white">{month}</p>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Year:
                  </p>
                  <p className="text-sm text-black dark:text-white">{year}</p>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Salary:
                  </p>
                  <p className="text-sm text-black dark:text-white">{amount}</p>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Bonus:
                  </p>
                  <p className="text-sm text-black dark:text-white">{bonus}</p>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Tax:
                  </p>
                  <p className="text-sm text-black dark:text-white">{tax}</p>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Total Paid:
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {totalPaid}
                  </p>
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-black dark:text-white">
                    Upload Contract PDF
                  </label>
                  <input
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    type="file"
                    onChange={handlePdfFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-6 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-black">
              <PrimaryButton onClick={handlePayNow}> Pay now</PrimaryButton>
              <DangerButton onClick={handleClose}>Cancel</DangerButton>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PayModal;
