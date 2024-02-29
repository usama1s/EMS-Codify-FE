// NavigationConstants.js

export const NAVIGATION_LINKS = [
  {
    path: "/",
    text: "Dashboard",
    userTypes: [1, 2, 3],
    role: [0]
  },
  {
    path: "/register-user",
    text: "Register Manager",
    userTypes: [1],
    role: [0]
  },
  {
    path: "/settings",
    text: "Settings",
    userTypes: [1, 2, 3],
    role: [0]
  },
  {
    path: "/attendance",
    text: "My Attendance",
    userTypes: [2, 3],
    role: [0]
  },
  {
    path: "/employee-attendence-and-progress",
    text: "Attendance and Progress",
    userTypes: [2],
    role: [1]
  },
  {
    path: "/leave-approval",
    text: "Leave Approval",
    userTypes: [2],
    role: [2]

  },
  {
    path: "/pay-schedule",
    text: "Pay Schedule",
    userTypes: [2],
    role: [3]
  },
  {
    path: "/employee-data",
    text: "Employee Data",
    userTypes: [2],
    role: [4]
  },
  {
    path: "/office-decorum",
    text: "Office Decorum",
    userTypes: [2],
    role: [5]
  },
  {
    path: "/asset-management",
    text: "Asset Management",
    userTypes: [2],
    role: [6]
  },
];


export const INPUT_FIELDS_PERSONAL_INFO = [
  { label: 'First Name', type: 'text', name: 'first_name', placeholder: 'Devid' },
  { label: 'Last Name', type: 'text', name: 'last_name', placeholder: 'John' },
  { label: 'Email Address', type: 'email', name: 'email', placeholder: 'devidjond45@gmail.com' },
  { label: 'Role', type: 'text', name: 'role', placeholder: 'devidjhon24' },
  { label: 'Designation', type: 'text', name: 'designation', placeholder: 'Senior Software Engineer' },
  { label: 'Date of Joining', type: 'text', name: 'date_of_joining', placeholder: 'YYYY-MM-DD' },
];


export const REGISTER_EMPLOYEE_FIELDS = [
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


export const leaveOptions = [
  { value: "marriage_leave", label: "Marriage Leave" },
  { value: "sick_leave", label: "Sick Leave" },
  { value: "casual_leave", label: "Casual Leave" },
  { value: "maternity_leave", label: "Maternity Leave" },
  { value: "paternity_leave", label: "Paternity Leave" },
  { value: "bereavement_leave", label: "Bereavement Leave" }
];

export const EMPLOYEE_CONTRACT_FIELDS = [
  {
    name: 'reporting_manager',
    type: 'text',
    placeholder: 'reporting manager',
    label: 'Reporting Manager',
  },
  {
    name: 'contract_start_date',
    type: 'date',
    placeholder: '22-Jan-2022',
    label: 'Start Date of Contract',
  },
  {
    name: 'contract_end_date',
    type: 'date',
    placeholder: '22-Jan-2022',
    label: 'End Date of Contract',
  },
  {
    name: 'pay',
    type: 'number',
    placeholder: '60,000',
    label: 'Employee Pay',
  },
];


export const ADD_ASSET_FIELDS = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Enter assets title',
    label: 'Title',
  },
  {
    name: 'description',
    type: 'text',
    placeholder: 'Enter assets descriptions (OPTIONAL)',
    label: 'Description',
  },
  {
    name: 'company',
    type: 'text',
    placeholder: 'Enter company name',
    label: 'Company',
  },
 
];