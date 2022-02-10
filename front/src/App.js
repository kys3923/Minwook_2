import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
  return (
    <Router>
      <Header />
      <Routes>
        {/* public route */}
        <Route path='/' element={<Main />} />
        <Route path='login' element={<LogIn />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='passwordreset/:resetToken' element={<PasswordReset />} />
        {/* private route */}
        <Route path='order' element={<Order />} />
        <Route path='reservation' element={<Reservation />} />
        <Route path='cart' element={<Cart />} />
        {/* admin route */}
        <Route path='admin' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />

      {/* <Landing /> */}
    </Router>
  );
}

export default App;
