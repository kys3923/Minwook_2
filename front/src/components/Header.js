import { Link } from 'react-router-dom';

const Header = (props) => {

  return (
    <nav className="header-nav">
      <div className="logo-imagebox">
        <Link to="/"><img src='/images/logo_sushivill.png' style={{ "maxWidth": "200px" }}/></Link>
      </div>
      <ul className='nav-links'>
        <li><Link to='/Order'>Order</Link></li>
        <li><Link to='/Reservation'>Reservation</Link></li>
        <li><Link to='/Account'>Account</Link></li>
        <li><Link to='/Cart'>Cart</Link></li>
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