import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function formatPhoneNumber(telNum) {
  if (!telNum) return telNum;

  const telPhoneNum = telNum.replace(/[^\d]/g, "");
  const phoneNumberLength = telPhoneNum.length;
  if (phoneNumberLength < 4) return telPhoneNum;
  if (phoneNumberLength < 7) {
    return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(3)}`;
  }
  return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(
    3,
    6
  )}-${telPhoneNum.slice(6, 10)}`;
}


const Register = (props) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.authToken) {
      navigate('/')
    }
  }, []);

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
      }, 10000);
      return setError("Passwords do not match")
    }

    
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        {username, email, password, contact}, 
        config);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("role", data.role)
      window.location.reload(false)
    } catch (error) {
      setError('The email address has already taken');
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  }


  const phoneNumberHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContact(formattedPhoneNumber);
  };

  
  return (
    <div className='Register_Container'>
      <form onSubmit={registerHandler} className='register_form'>
        <h3 className='register_title'>Register</h3>
        {error && <span className='error_message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input 
            type='text' 
            required 
            id="name" 
            placeholder='Enter name' 
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
          <label htmlFor='contact'>Contact Number:</label>
          <input 
            type='tel'
            placeholder='(123) 456-7890'
            required 
            id="contact"
            value={contact}
            autoComplete="off" 
            onChange={(e) => phoneNumberHandler(e)} 
          />
        </div>

        <button type="submit" className='form_button_primary'>Register</button>

        <span className='register_subtext'>Already have an account? <Link to="../login" className='login_register'>   Login</Link></span>
      </form>
    </div>
  );
}
export default Register;