import * as React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

// import Landing from './pages/Landing';
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';
import Main from './pages/landing_parts/Main';
import Order from './pages/order/Order';
import Reservation from './pages/Reservation';
import Cart from './pages/order/Cart';
import LogIn from './pages/account/LogIn';
import Register from './pages/account/Register';
import ForgotPassword from './pages/account/ForgotPassword';
import PasswordReset from './pages/account/PasswordReset';
import Dashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import EditMenu from './pages/admin/MenuMgmt/EditMenu';
import RegisterMenu from './pages/admin/MenuMgmt/RegisterMenu';
import Account from './pages/account/Account';
import TOC from './pages/TermsOfConditions/TOC';
import Confirmation from './pages/order/Confirmation';


function App() {

  const adminUser = localStorage.role;
  const [ authUser, setAuthUser ] = useState('');
  const [ storeOpen, setStoreOpen ] = useState('');
  const [ manualOpen, setManualOpen ] = useState(false);

  const determineDay = (date) => {
    let currentDay = moment(date).format('dddd');
    if (currentDay === 'Monday' || currentDay === "Wednesday" || currentDay === "Thursday" || currentDay === "Sunday") {
      return 'regular hours'
    } else if (currentDay === 'Friday' || currentDay === 'Saturday') {
      return 'longer hours'
    } else {
      return 'restaurant closed'
    }
  }

  const TimeFormatter = (time) => {
    let formattedTime = moment(time).format('HHmm')
    let first2Digits = formattedTime.slice(0, 2)
    let last2Digits = formattedTime.slice(2, 4)
    let hours2Min = Number(first2Digits) * 60 + Number(last2Digits)
    return hours2Min
  }

  const storeOpener = (date, time) => {
    let hour1200 = 720;
    let hour2100 = 1260;
    let hour2130 = 1290;
    let hour1500 = 900;
    if (date === 'regular hours' && time > hour1500 && time < hour2100 ) {
      return 'regular open'
    } else if (date === 'longer hours' && time > hour1500 && time < hour2130) {
      return 'longer hour open'
    } else if (date === 'regular hours' && time >= hour1200 && time <= hour1500) {
      return 'lunch hour'
    } else if (date === 'longer hours' && time >= hour1200 && time <= hour1500) {
      return 'lunch hour'
    } else {
      return 'closed'
    }
  }



  useEffect(() => {
    if (adminUser == 'user') {
      setAuthUser('user')
    }
    if (adminUser == "admin") {
      setAuthUser('admin')
    }

    async function fetchStatus() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/status/checkStatus`, config)
      console.log(typeof(request.data.status[0].status))
      return request
    }
    fetchStatus();
    // setTimeout(() => {
    //   let status = storeOpener(determineDay(new Date()), Number(TimeFormatter(new Date())))
    //   if (status === 'lunch hour') {
    //     setStoreOpen('lunch')
    //   } else if (status === 'regular open') {
    //     setStoreOpen('regular')
    //   } else if (status === 'longer hour open') {
    //     setStoreOpen('weekend')
    //   } else if (status === 'closed') {
    //     setStoreOpen('closed')
    //   } else {
    //     setStoreOpen('')
    //   }
    // }, 30000)
  },[])

  const AdminRoute = () => {
    if(authUser == 'admin') {
      return <Outlet />
    } else {
      return <Navigate to='login' />
    }
  }

  const UserRoute = () => {
    if(authUser == 'user' || authUser == 'admin') {
      return <Outlet />
    }
    if(!adminUser) {
      return <Navigate to='login' />
    }
  }

  return (
    <Router>
      <Header authUser={authUser}/>
      <Routes>
        {/* public route */}
        <Route path='/' element={<Main />} />
        <Route path='policy-agreement' element={<TOC />} />
        <Route path='login' element={<LogIn />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='passwordreset/:resetToken' element={<PasswordReset />} />
        {/* private route */}
        <Route element={<UserRoute />}>
          <Route path='account' element={<Account />} />
          <Route path='order' element={<Order />}>
          </Route>
          <Route path='reservation' element={<Reservation />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        {/* admin route */}
        <Route element={<AdminRoute />}>
          <Route path='dashboard' element={<Dashboard storeOpen={storeOpen} setStoreOpen={setStoreOpen} manualOpen={manualOpen} setManualOpen={setManualOpen}/>} />
          <Route path='menu' element={<MenuManagement />}>
            <Route path='edit' element={<EditMenu />} />
            <Route path='registermenu' element={<RegisterMenu />} />
          </Route>
        </Route>
        {/* TODO: add not found page */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
