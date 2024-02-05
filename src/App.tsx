import { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import RegisterUser from './pages/RegisterUser';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './routes/protectedRoute';
import Dashboard from './pages/Dashboard';
import MarkAttendance from './pages/MarkAttendance';
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
        </Route>


        {/* <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignIn />
            )
          }
        />
        <Route element={<DefaultLayout />}>
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route> */}
      </Routes >
    </>
  );
}

export default App;
