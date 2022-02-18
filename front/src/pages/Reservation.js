import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// MUI
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


const Reservation = (props) => {
  
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ contact, setContact ] = useState ('');
  const [ totalParty, setTotalParty] = useState(0);
  const [ comments, setComments ] = useState('');
  const [ error, setError ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ reserveDate, setReserveDate ] = useState(new Date());
  const [ isConfirmed, setIdConfirmed ] = useState(false);
  const navigate = useNavigate();
  
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
  
  const phoneNumberHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContact(formattedPhoneNumber);
  };
  console.log(localStorage)

  const reservationHandler = async (e) => {
    e.preventDefault();

    setUserId(localStorage.userId)
    console.log (
      username,
      reserveDate,
      userId,
      "in useEffect, checking submit"
    )
  }

  return (
    <div className="reservationContainer">
      <form onSubmit={reservationHandler} className='register_form'>
        <h3 className="register_title">Make a Reservation</h3>
        {error && <span className="error_message">{error}</span>}
        <div className='form-group'>
          <label htmlFor='email'>Email Address:</label>
          <input 
            type='email'
            required
            id='email'
            placeholder='Enter contact email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contact'>Contact Number:</label>
          <input 
            type='tel'
            required
            id='contact'
            placeholder='Enter contact number'
            value={contact}
            onChange={(e) => phoneNumberHandler(e)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='totalParty'>Number of party:</label>
          <input 
            type='number'
            required
            id='totalParty'
            placeholder='Enter number of your party'
            value={totalParty}
            onChange={(e) => setTotalParty(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='reserveDate'>Reservation Date and Time:</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker 
              renderInput={(props) => <TextField {...props} />}
              value={reserveDate}
              onChange={(newValue) => {setReserveDate(newValue)}}
            />
          </LocalizationProvider>
        </div>

        <div className='form-group'>
          <label htmlFor='comments'>Comments:</label>
          <input 
            type='text'
            id='comments'
            overflow='visible'
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <input 
            type='hidden'
            required
            id='username'
            hidden
            value={username}
            onChange={(e) => phoneNumberHandler(e)}
          />
        </div>

        <button className='form_button_primary'>Confirm Reservation</button>
        
      </form>
    </div>
  );
}
export default Reservation;