import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const loginHandler = async (e) => {
    e.preventDefault();
    
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };
    
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        { email, password },
        config
        );
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", data.role)
      } catch (error) {
        setError('Please check your email and password')
      }
      window.location.reload(false)
    }

  useEffect(() => {
    if (localStorage.role == 'admin') {
      navigate('/dashboard')

    } else if (localStorage.authToken) {
      navigate('/')
    }
  }, []);


  return (
    <div className='LogIn_Container'>
      <form onSubmit={loginHandler} className='login_form'>
        <h3 className='login_title'>Login</h3>
        {error && <span className='error_message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Enter email address'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>
            Password: {" "}
          </label>
          <input
            type='password'
            required
            id='password'
            autoComplete='true'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type='submit' className='form_button_primary'>
          login
        </button>
        <Link to="../forgotpassword" className='login_forgotpassword'>Forgot Password?</Link>
        <span className='login_subtext'>
          Don't have an account?
          <Link to='../register' className='login_register'>  Register</Link>
        </span>
      </form>

    </div>
  );
}
export default LogIn;