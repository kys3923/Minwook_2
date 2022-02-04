import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = ({history}, props) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push('/');
      // push to default route
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      }
    }

    if(password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("")
      }, 5000);
      return setError("Passwords do not match")
    }

    try {
      const {data} = await axios.post("/api/auth/register", {username, email, password, phoneNumber}, config);

      localStorage.setItem("authToken", data.token);
      history.pushState("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }
  
  return (
    <div className='Register_Container'>
      <form onSubmit={registerHandler} className='register_form'>
        <h3 className='register_title'>Register</h3>
        {error && <span className='error_message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input 
            type='text' 
            required 
            id="name" 
            placeholder='Enter username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            required 
            id="email" 
            placeholder='Enter email address' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            required 
            id="password" 
            placeholder='Enter password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div className='form-group'>
          <label htmlFor='confirmpassword'>Confirm Password:</label>
          <input 
            type='password' 
            required 
            id="confirmpassword" 
            placeholder='Confirm password' 
            value={confirmpassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contact'>Contact:</label>
          <input 
            type='tel' 
            required 
            id="contact" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
        </div>

        <button type="submit" className='form_button_primary'>Register</button>

        <span className='register_subtext'>Already have an account? <Link to="login">Login</Link></span>
      </form>
      <p>this is register page</p>
    </div>
  );
}
export default Register;