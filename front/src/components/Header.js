import { Link } from 'react-router-dom';

const Header = (props) => {

  return (
    <nav className="header-nav">
      <div className="logo-imagebox">
        <Link to="/"><a><img src='/images/logo_sushivill.png' style={{ "maxWidth": "200px" }}/></a></Link>
      </div>
      <ul className='nav-links'>
        <li><Link to='/Order'><a>Order</a></Link></li>
        <li><Link to='/Reservation'><a>Reservation</a></Link></li>
        <li><Link to='/Account'><a>Account</a></Link></li>
        <li><Link to='/Cart'><a>Cart</a></Link></li>
      </ul>

      {/* <div className={classes.buttonContainer}>
        <Button className={classes.buttons} href="/Order">Order</Button>
        <Button className={classes.buttons} href="Reservation">Reservation</Button>
        <Button className={classes.buttons} href="/Account">Account</Button>
        <Button className={classes.buttons} href="/Cart">Cart</Button>
      </div> */}

    </nav>
  );
}
export default Header;