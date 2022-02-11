import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = (props) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/forgotpassword`,
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className='forgotpassword_container'>
      <form
        onSubmit={forgotPasswordHandler}
        className='forgotpassword_form'
      >
        <h3 className='forgotpassword_title'>Forgot Password</h3>
        {error && <span className='error_message'>{error}</span>}
        {success && <span className='success_message'>{success}</span>}
        <div className='form-group'>
          <p className='forgotpassword_subtext'>
            Please enter the email address you register your account with. <br />
            We will send you reset password confirmation to this email.
          </p>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email'
            required
            id='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit' className='form_button_primary'>Send Email</button>
      </form>
    </div>
  );
}
export default ForgotPassword;