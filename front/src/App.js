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
import Dashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import EditMenu from './pages/admin/MenuMgmt/EditMenu';
import RegisterMenu from './pages/admin/MenuMgmt/RegisterMenu';
import Account from './pages/account/Account';


function App() {

  const adminUser = localStorage.role;
  const [ authUser, setAuthUser ] = useState('');
  const [ cart, setCart ] = useState([]);

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
          <Route path='account' element={<Account />} />
          <Route path='order' element={<Order cart={cart} />} />
          <Route path='reservation' element={<Reservation />} />
          <Route path='cart' element={<Cart cart={cart} />} />
        </Route>
        {/* admin route */}
        <Route element={<AdminRoute />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='menu' element={<MenuManagement />}>
            <Route path='edit' element={<EditMenu />} />
            <Route path='registermenu' element={<RegisterMenu />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
