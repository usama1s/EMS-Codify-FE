import React from 'react';
import { EmployeeDetailModalProps } from '../../common/interfaces';

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  onClose,
  first_name,
  last_name,
  email,
  dateOfJoining,
  designation,
}) => {
  const handleClose = async () => {
    onClose();
  };

  return (
    <>
      <div className="rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className=" relative w-1/4 h-96 ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-black">
              <h3 className="text-2xl font-semibold text-black">
                Employee Detail
              </h3>
            </div>

            <div className="relative p-6 bg-black">
              <div className="flex justify-between">
                <h2 className="font-extrabold">Fullname:</h2>
                <p className="text-sm text-black dark:text-white">
                  {first_name} {last_name}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="font-extrabold ">Email:</p>
                <p className="text-sm text-black dark:text-white">{email}</p>
              </div>
              <div className="mt-5 flex justify-between">
                <p className=" font-extrabold ">Date of joining:</p>
                <p className="text-sm text-black dark:text-white">
                  {dateOfJoining}
                </p>
              </div>
              <div className="mt-5 flex justify-between">
                <p className=" font-extrabold ">Designation</p>
                <p className="text-sm text-black dark:text-white">
                  {designation}
                </p>
              </div>
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
    </>
  );
};

export default EmployeeDetailModal;
