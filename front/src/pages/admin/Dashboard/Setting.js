import { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// Mui
import { Typography, Grid, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from '@mui/lab';

// components
import StoreOpen from './StoreOpen';
import theme from '../../../theme/theme';


const TimeFormatter = (time) => {
  let formattedTime = moment(time).format('HHmm')
  let first2Digits = formattedTime.slice(0, 2)
  let last2Digits = formattedTime.slice(2, 4)
  let hours2Min = Number(first2Digits) * 60 + Number(last2Digits)
  return hours2Min
}
// Store on/off, set schedule
// log off
// Change pw


const Setting = (props) => {

  // Handler
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <StoreOpen 
        TimeFormatter={TimeFormatter}
        storeOpen={props.storeOpen} 
        setStoreOpen={props.setStoreOpen} 
        manualOpen={props.manualOpen} 
        setManualOpen={props.setManualOpen}
      />
    </ThemeProvider>
  );
}
export default Setting;