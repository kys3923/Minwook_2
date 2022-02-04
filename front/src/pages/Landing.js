import { Route, Routes } from 'react-router-dom';
import Main from './landing_parts/Main';
import Order from './Order';
import Reservation from './Reservation';
import Cart from './Cart';
import Account from './account/Account';
import LogIn from './account/LogIn';
import Register from './account/Register';
import ForgotPassword from './account/ForgotPassword';
import PasswordReset from './account/PasswordReset';
import PrivateRoute from './PrivateRoute/PrivateRoute';
// import PrivatePage from './PrivateRoute/PrivatePage';

const Landing = (props) => {
  return (
    <main className="landingContainer">
      <Routes>
        {/* <PrivateRoute exact path="/" element={<PrivatePage />} /> */}
        <Route path="/" element={<Main />} />
        <Route element={<PrivateRoute />} >
          <Route path="order" element={<Order />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="account" element={<Account />}>
            <Route index path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="passwordreset/:resetToken" element={<PasswordReset />} />
          </Route>
          <Route path="Cart" element={<Cart />} />
        </Route>
      </Routes>
    </main>
  );
}
export default Landing;