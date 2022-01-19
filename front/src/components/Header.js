const Header = (props) => {
  return (
    <div className="Header_Container">
      <h1>header</h1>
      <div className="Header_Imagebox">
      </div>
      <ul>
        <li>Menu</li>
        {/* connnect to backend to toggle the delivery options */}
        <li>Order</li>
        <li>Reservation</li>
        <li>Contact</li>
        <li>Account</li>
      </ul>
    </div>
  );
}
export default Header;