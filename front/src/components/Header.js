import { Link } from 'react-router-dom';

const Header = (props) => {

  return (
    <nav className="header-nav">
      <div className="logo-imagebox">
        <Link to="/"><img src='/images/logo_sushivill.png' style={{ "maxWidth": "200px" }}/></Link>
      </div>
      <ul className='nav-links'>
        <li><Link to='order'>Order</Link></li>
        <li><Link to='reservation'>Reservation</Link></li>
        <li><Link to='account/login'>Account</Link></li>
        <li><Link to='account/register'>Register</Link></li>
        <li><Link to='account/forgotpassword'>ForgotPassword</Link></li>
        <li><Link to='account/passwordreset/:1'>PasswordReset</Link></li>
        <li><Link to='cart'>Cart</Link></li>
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