import { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/SignIn';
import Loader from './common/Loader';
import RegisterUser from './pages/RegisterUser';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './routes/protectedRoute';
import Dashboard from './pages/Dashboard';
import MarkAttendance from './pages/MarkAttendance';
import EmployeeData from './pages/EmployeeData';
import AllEmployeeAttendance from './pages/AllEmployeeAttendance';
import LeaveApproval from './pages/LeaveApproval';
import PaySchedule from './pages/PaySchedule';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route
          path='/sign-in'
          element={<SignIn />}
        />
        <Route element={<DefaultLayout />}>
          <Route
            path='/'
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path='/register-user'
            element={<ProtectedRoute Component={RegisterUser} />}
          />
          <Route
            path='/attendance'
            element={<ProtectedRoute Component={MarkAttendance} />}
          />
          <Route
            path='/profile'
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path='/settings'
            element={<ProtectedRoute Component={Settings} />}
          />
          <Route
            path='/employee-data'
            element={<ProtectedRoute Component={EmployeeData} />}
          />
          <Route
            path='/employee-attendence-and-progress'
            element={<ProtectedRoute Component={AllEmployeeAttendance} />}
          />
          <Route
            path='/leave-approval'
            element={<ProtectedRoute Component={LeaveApproval} />}
          />
          <Route
            path='/pay-schedule'
            element={<ProtectedRoute Component={PaySchedule} />}
          />
        </Route>
      </Routes >
    </>
  );
}

export default App;
