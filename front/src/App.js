import * as React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';

// import Landing from './pages/Landing';
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';
import Main from './pages/landing_parts/Main';
import Order from './pages/Order';
import Reservation from './pages/Reservation';
import Cart from './pages/Cart';
import LogIn from './pages/account/LogIn';
import Register from './pages/account/Register';
import ForgotPassword from './pages/account/ForgotPassword';
import PasswordReset from './pages/account/PasswordReset';
import Admin from './pages/admin/Admin';
import Dashboard from './pages/admin/Dashboard';


function App() {

  const adminUser = localStorage.role;
  const [ authUser, setAuthUser ] = useState('');

  useEffect(() => {
    if (adminUser == 'user') {
      setAuthUser('user')
    }
    if (adminUser == "admin") {
      setAuthUser('admin')
    }
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
        <Route path='login' element={<LogIn />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='passwordreset/:resetToken' element={<PasswordReset />} />
        {/* private route */}
        <Route element={<UserRoute />}>
          <Route path='order' element={<Order />} />
          <Route path='reservation' element={<Reservation />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        {/* admin route */}
        <Route element={<AdminRoute />}>
          <Route element={<Admin />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <Footer />

      {/* <Landing /> */}
    </Router>
  );
}

export default App;
