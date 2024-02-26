import { ManagersTableProps } from '../../common/interfaces';
import React, { useEffect, useState } from 'react';
import RegisterModal from '../Modals/RegisterModal';
import ManagerModal from '../Modals/ManagerDetailModal';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import svgImg from '../../images/brand/eye.svg';

const StyledButton = styled.button`
  color: black;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-image: url(${svgImg});
  background-size: contain;
  background-repeat: no-repeat; /* Adjust as needed */
  height: 45px;
  width: 45px;
`;

const customStyles = {
  rows: {
    style: {
      backgroundColor: '#24303F',
      color: 'white',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#24303F',
      color: 'white',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#24303F',
      color: 'white',
    },
    pageButtonsStyle: {
      color: 'white',
    },
  },
};

const AllManagersTable: React.FC<ManagersTableProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>();

  let Tabledata: any = [];
  let dataObj = {};
  data.map((manager, index) => {
    dataObj = {
      id: index,
      name: manager.first_name + ' ' + manager.last_name,
      email: manager.email,
      designation: manager.designation,
      dateOfJoining: manager.dateOfJoining,
      viewIcon: <StyledButton onClick={() => viewModal(index)}></StyledButton>,
    };
    Tabledata.push(dataObj);
  });

  const viewModal = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const columns: any = [
    {
      name: 'Name',
      selector: (row: { name: string }) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: (row: { designation: string }) => row.designation,
      sortable: true,
    },
    {
      name: 'Date of Joining',
      selector: (row: { dateOfJoining: any }) => row.dateOfJoining,
    },
    {
      name: 'Employee Details',
      selector: (row: { viewIcon: string }) => row.viewIcon,
    },
  ];

  const [records, setRecords] = useState<any>(Tabledata);

  useEffect(() => {
    setRecords(Tabledata);
  }, [Tabledata.length]);
  console.log(Tabledata);

  function handleFilter(event: { target: { value: any } }) {
    if (!Tabledata) return;
    const newData = Tabledata.filter(
      (row: { name: { toLowerCase: () => any } }) => {
        return row.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      },
    );

    setRecords(newData);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="text-end mb-2 mt-2 mr-5">
        <input type="text" className="rounded  " onChange={handleFilter} />
      </div>

      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        customStyles={customStyles}
      ></DataTable>

      <div className="flex justify-between py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Managers Attendence
        </h4>
        <button
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-8 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2 "
          onClick={openRegisterModal}
        >
          Register Manager
        </button>
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
      {data.map((manager, index) => (
        <div
          key={index}
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {manager.first_name} {manager.last_name}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {manager.email}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {manager.designation}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {manager.dateOfJoining}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <div
              className="h-10 w-10 bg-blue-800 text-white ml-10"
              onClick={() => viewModal(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // enable-background="new 0 0 35 35"
                viewBox="0 0 35 35"
                id="view"
              >
                <path
                  d="M33.5,17.5c-4.4-6-10.2-9-16-9c-5.8,0-11.6,3-16,9C10.3,29.5,24.7,29.5,33.5,17.5z M12.3,12.5c-0.5,0.9-0.8,1.9-0.8,3
                           c0,3.3,2.7,6,6,6s6-2.7,6-6c0-1.1-0.3-2.1-0.8-3c2.5,1,4.9,2.7,7,5c-3.5,3.9-7.7,6-12.1,6c-4.4,0-8.7-2.1-12.2-6
                              C7.4,15.2,9.8,13.5,12.3,12.5z"
                  fill="white"
                ></path>
              </svg>
            </div>
            {/* <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-8 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2" onClick={() => viewModal(index)}>
                            View Employee Details
                        </button> */}
          </div>
        </div>
      ))}
      {showModal && currentIndex !== undefined ? (
        <ManagerModal
          onClose={handleClose}
          first_name={data[currentIndex].first_name}
          last_name={data[currentIndex].last_name}
          email={data[currentIndex].email}
          designation={data[currentIndex].designation}
          roles={data[currentIndex].roles}
          user_type={data[currentIndex].user_type}
          dateOfJoining={data[currentIndex].dateOfJoining}
        />
      ) : null}
      {showRegisterModal ? (
        <RegisterModal onClose={closeRegisterModal} />
      ) : null}
    </div>
  );
};

export default AllManagersTable;
