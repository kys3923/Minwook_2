import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = (props) => {

  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      localStorage.clear();
      navigate('/')
      window.location.reload(false)
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
        {!props.authUser ? <li><Link to='login'>Login/Register</Link></li>
          :
          <></>
        }
        {localStorage.role == "user" &&
          <li><Link to='account'>Account</Link></li>
        }
        <li><Link to='cart'>Cart</Link></li>
        {localStorage.role == "admin" &&
          <li><Link to='dashboard'>Dashboard</Link></li>
          // TODO: add admin header menu itself, rewrite everything
        }
        <button onClick={logoutHandler}>Logout</button>
      </ul>
    </nav>
  );
}
export default Header;