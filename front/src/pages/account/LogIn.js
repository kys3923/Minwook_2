import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LogIn = ({history}, props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push('/');
      // push to default route
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

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
            <Link to="forgotpassword" className='login_forgotpassword'>Forgot Password?</Link>
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
        <span className='login_subtext'>
          Don't have an account?
          <Link to='register'>Register</Link>
        </span>
      </form>

    </div>
  );
}
export default LogIn;