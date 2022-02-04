import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = ({ match }) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='resetpassword_container'>
      <form
        onSubmit={resetPasswordHandler}
        className='resetpassword_form'
      >
        <h3 className='resetPassword_title'>Forgot Password</h3>
        {error && <span className='error_message'>{error}</span>}
        {success && (<span className='success_message'>{success} <Link to="login">Login</Link></span>)}
        <div className='form-group'>
          <label htmlFor='password'>New Pasword:</label>
          <input 
            type='password'
            required
            id="password"
            placeholder='Enter new password'
            autoComplete='true'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm New Pasword:</label>
          <input 
            type='password'
            required
            id="confirmPassword"
            placeholder='Confirm new password'
            autoComplete='true'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='form_button_primary'>Reset Password</button>
      </form>
      <p>this is password Reset page</p>
    </div>
  );
}
export default PasswordReset;