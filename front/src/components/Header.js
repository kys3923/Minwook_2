import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <nav className="Header_Container">
      <div className="Header_Imagebox">
        <h6>Logo here</h6>
      </div>
      <ul>
        <Link to='/'>Home</Link>
        <Link to='/Order'>Order</Link>
        {/* connnect to backend to toggle the delivery options */}
        <Link to='/Reservation'>Reservation</Link>
        <Link to='/Account'>Account</Link>
        <Link to='/Cart'>Cart</Link>
      </ul>
    </nav>
  );
}
export default Header;