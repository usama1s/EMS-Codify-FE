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
    path: "/profile",
    text: "Profile",
    userTypes: [1, 2, 3],
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
    text: "Attendance",
    userTypes: [2, 3],
    role: [0]
  },
  {
    path: "/leave-approval",
    text: "Leave Approval",
    userTypes: [2],
    role: [2]

  },
  {
    path: "/daily-progress",
    text: "Employee Daily Progress",
    userTypes: [2],
    role: [3]

  },
  {
    path: "/pay-schedule",
    text: "Pay Schedule",
    userTypes: [2],
    role: [4]
  },
  {
    path: "/employee-data",
    text: "Employee Data",
    userTypes: [2],
    role: [5]
  },
  {
    path: "/office-decorum",
    text: "Office Decorum",
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