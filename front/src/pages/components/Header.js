import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = (props) => {

  const [ role, setRole ] = useState('');
  const navigate = useNavigate();
  
  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      localStorage.clear();
      if (!localStorage.getItem("authToken")) {
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="header-nav">
      <div className="logo-imagebox">
        <Link to="/"><img src='/images/logo_sushivill.png' style={{ "maxWidth": "200px" }}/></Link>
      </div>
      <ul className='nav-links'>
        <li><Link to='order'>Order</Link></li>
        <li><Link to='reservation'>Reservation</Link></li>
        <li><Link to='login'>Login/Register</Link></li>
        <li><Link to='forgotpassword'>ForgotPassword</Link></li>
        <li><Link to='passwordreset/:1'>PasswordReset</Link></li>
        <li><Link to='cart'>Cart</Link></li>
        <button onClick={logoutHandler}>Logout</button>
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