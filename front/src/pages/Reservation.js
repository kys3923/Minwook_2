import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// MUI
import { TextField, Paper, Grid, Button, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import theme from '../theme/theme';


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

  const reservationHandler = async (e) => {
    e.preventDefault();

    await setUserId(localStorage.userId);

    const config = {
      header: { 
        header: { 
          "Content-Type": "application/json"
        }
      }
    }

    const request = {
      body: {
        "customer": `${userId}`,
        "email": `${email}`,
        "contact": `${contact}`,
        "totalParty": `${totalParty}`,
        "comments": `${comments}`,
        "reserveDate": `${reserveDate}`
      }
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/reservation/create`, request.body, config
      )
    } catch (error) {
      setError('A problem occured during resigter you reservation');
      setTimeout(() => {
        setError('');
      }, 10000);
    }
    console.table (
      request.body,
      "in useEffect, checking submit"
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ 
        paddingTop: '6em', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 240, 174, 0.75)'
      }}>
        <Grid item sx={{ marginTop: '3em'}}>
          <Paper sx={{ 
            marginBottom: '2em',
            borderRadius: '10px'
            }} elevation={2}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'darkgreen', textAlign: 'center', paddingTop: '1.5em', marginBottom: '1em'}}>
              Make a Reservation
            </Typography>
            {error && <span className="error_message">{error}</span>}
            <form onSubmit={reservationHandler} className='register_form'>
              <TextField 
                type='email'
                required
                id='email'
                label='Enter your email'
                value={email}
                variant='outlined'
                autoComplete='on'
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <TextField 
                type='tel'
                required
                id='contact'
                value={contact}
                variant='outlined'
                autoComplete='on'
                label='Enter contact number'
                onChange={(e) => phoneNumberHandler(e)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <TextField 
                type='number'
                required
                id='totalParty'
                value={totalParty}
                variant='outlined'
                label="Number of your party"
                autoComplete='on'
                onChange={(e) => setTotalParty(e.target.value)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <TextField 
                type='text'
                multiline
                maxRows={3}
                id='comments'
                value={comments}
                variant='outlined'
                label='Comments on your reservation'
                autoComplete='on'
                onChange={(e) => setComments(e.target.value)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker 
                  renderInput={(props) => <TextField {...props} />}
                  value={reserveDate}
                  onChange={(newValue) => {setReserveDate(newValue)}}
                  label="Set Date and Time"
                />
              </LocalizationProvider>
              <TextField 
                type='hidden'
                required
                id='username'
                value={username}
                variant='filled'
                autoComplete='on'
                onChange={(e) => setComments(e.target.value)}
              />
              <Button variant='contained' type='submit' sx={{ marginTop: '2em'}}>Confirm Reservation</Button>
            </form>
          </Paper>              
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Reservation;