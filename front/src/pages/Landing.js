import { Route, Routes } from 'react-router-dom';
import Main from './landing_parts/Main';
import Order from './Order';
import Reservation from './Reservation';
import Cart from './Cart';
import Account from './Account';

const Landing = (props) => {
  return (
    <main className="landingContainer">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </main>
  );
}
export default Landing;