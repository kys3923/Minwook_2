import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <nav className="Header_Container">
      <div className="Header_Imagebox">
        <h6>Logo here</h6>
      </div>
      <ul>
        <li>Menu</li>
        {/* connnect to backend to toggle the delivery options */}
        <li>Order</li>
        <li>Reservation</li>
        <li>Contact</li>
        <li>Account</li>
        <li>Cart</li>
      </ul>
    </nav>
  );
}
export default Header;