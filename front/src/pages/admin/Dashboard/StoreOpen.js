import { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Grid, Modal, Typography, CircularProgress, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab'; 
import theme from '../../../theme/theme'

const StoreOpen = (props) => {
  // States
  const [ storeOpen, setStoreOpen ] = useState()
  const [ isFetching, setIsFetching ] = useState(false);
  const [ status, setStatus ] = useState();
  const [ auto, setAuto ] = useState();
  // handlers

  const stateChanger = (e) => {
    e.preventDefault();
    props.setManualOpen(!props.manualOpen)
  }

  const sendOutText = (Boolean) => {
    if (!!Boolean) {
      return 'Yes it is open'
    } else if (!Boolean) {
      return 'No it is closed'
    } else {
      return 'Loading...'
    }
  }

  const buttonOutText = (Boolean) => {
    if (!!Boolean) {
      return ''
    }
  }

  const fetchStatus = async (e) => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/status/checkStatus`, config)
    console.log(request.data.status[0].status)
  }
  // useEffect
  useEffect(() => {
    // get props storeOpen
    const setManualOpenState = (Boolean) => {
      if (Boolean) {
        setStoreOpen(true);
      } else {
        setStoreOpen(false);
      }
    }
    setManualOpenState(props.manualOpen);
  },[])
  
  console.log(storeOpen)
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Typography>{sendOutText(storeOpen)}</Typography>
        <Button onClick={stateChanger} variant='contained'>Change</Button>
        <LoadingButton loading={isFetching} onClick={fetchStatus} variant='contained'>Fetch Data</LoadingButton>
      </Grid>
    </ThemeProvider>
  );
}
export default StoreOpen;