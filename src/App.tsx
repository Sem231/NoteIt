import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';

import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';

import Tables from './pages/Tables';

import Space from './components/Space';
import SpaceInfo from './components/SpaceInfo';
import Dashboard from './pages/Dashboard/Dashboard';
import ShareInfo from './pages/Dashboard/Share/ShareInfo';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  // const preloader = document.getElementById('preloader');
  let token = localStorage.getItem('_ttt_');
  const PrivateRoute = useCallback(
    ({ children }: any) => {
      if (token) {
        // render the wrapped page
        return children;
      } else {
        // user not logged in, redirect to the Login page which is unprotected
        return <Navigate to={'/'} />;
      }
    },
    [token]
  );

  // if (preloader) {
  //   setTimeout(() => {
  //     preloader.style.display = 'none';
  //     setLoading(false);
  //   }, 2000);
  // }

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);
  return (
    //  loading ? (
    //   <p className=" text-center text-danger">Failed to lead app</p>
    // ) : (

    <>
      <Routes>
        <Route
          path="/space"
          element={
            <PrivateRoute>
              <SpaceInfo />
            </PrivateRoute>
          }
        />

        <Route
          path="/overview/:spaceId"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/chart" element={<Chart />} />
        {/* <Route path="/ui/alerts" element={<Alerts />} /> */}
        {/* <Route path="/ui/buttons" element={<Buttons />} /> */}
        <Route path="/createspace" element={<Space />} />
        {/* <Route path="/review/:spaceId" element={<Review />} /> */}
        {/* <Route path="/widgets/:spaceId" element={<Widgets />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ShareNotes/:SpaceId/:studioId" element={<ShareInfo />} />
        {/* <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/analytics/:spaceId" element={<Statistics />} />
        <Route path="/customization/:spaceId" element={<Customization />} />
        <Route path="/demoView/:demoid" element={<DemoView />} />
        <Route path="/editor/:demoid" element={<Editor />} />
        <Route path="/productDemo/:SpaceId/:DemoId" element={<ShareTemplate />} /> */}
      </Routes>
    </>
  );
}

export default App;
