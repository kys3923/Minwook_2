// TODO: confirmation modal for editing profile
// TODO: forgot password

import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

// MUI
import { TextField, Grid, Typography, Button, Tabs, Tab, Box, List, ListItemButton, ListItemText, Collapse, Card, Modal, ListItem, CircularProgress } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// MUI Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{ bgcolor: 'blue', width: '100%'}}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className='thebox' style={{ }}>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function allyProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const useTabStyles = makeStyles({
  'root': {
    'width': '100%',
    '&.Mui-selected': {
      'color': 'white'
    } 
  },
  scroller: {
    flexGrow: '0',
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

// phoneNum

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

const Account = (props) => {

  const [ id, setId ] = useState('');
  const [ userData, setUserData ] = useState(null);
  const [ value, setValue ] = useState(0);
  // state for dashboard
  const [ currentOrderOpen, setCurrentOrderOpen ] = useState(false);
  const [ fulfilledOrderOpen, setFulfilledOrderOpen ] = useState(false);
  const [ currentReserveOpen, setCurrentReserveOpen ] = useState(false);
  const [ pastReserveOpen, setPastReserveOpen ] = useState(false);
  // state for accout detail
  const [ username, setUsername ] = useState('');
  const [ contact, setContact ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail] = useState('');
  const [ address1, setAddress1 ] = useState('');
  const [ acctModalOpen, setAcctModalOpen] = useState(false);
  const [ pwModalOpen, setPwModalOpen ] = useState(false);
  const [ updateModalOpen, setUpdateModalOpen ] = useState(false);
  const [ error, setError ] = useState('');
  const [ success, setSuccess] = useState('');

  // MUI tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  const classes = useTabStyles();

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/${localStorage.userId}`, config);
      setUserData(request.data.user)
      return request
    }
    fetchData();
  }, [acctModalOpen])

  const navigate = useNavigate();

  // Handlers
  // -- Dashboard
  
  const currentOrderHandler = (e) => {
    setCurrentOrderOpen(!currentOrderOpen);
  }
  
  const fulfilledOrderHandler = (e) => {
    setFulfilledOrderOpen(!fulfilledOrderOpen);
  }
  
  const currentReserveHandler = (e) => {
    setCurrentReserveOpen(!currentReserveOpen);
  }
  
  const pastReserveHandler = (e) => {
    setPastReserveOpen(!pastReserveOpen);
  }

  // -- Acct Details
  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      localStorage.clear();
      navigate('/')
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }

  const acctModalHandler = (e) => {
    setAcctModalOpen(!acctModalOpen);
    setUsername(userData.username);
    setContact(userData.contact);
    setEmail(userData.email);
    setAddress1(userData.address1);
  }

  const acctModalCloser = (e) => {
    setAcctModalOpen(!acctModalOpen);
  }

  const pwModalHandler =(e) => {
    setPwModalOpen(!pwModalOpen);
  }

  const phoneNumberHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContact(formattedPhoneNumber);
  };

  const backToHomeHandler = (e) => {
    navigate('/');
  }

  const editAcctHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
      id: `${localStorage.userId}`,
      username: `${username}`,
      contact: `${contact}`,
      email: `${email}`,
      address1: `${address1}`,
    };

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/${localStorage.userId}`, 
        config
      );
      setSuccess(data.data)
    } catch (error) {
      setError(error.response.data.error)
      console.log(error);
    }

    setAcctModalOpen(!acctModalOpen);
  }

  const checkHandler = (e) => {
    console.log( username, email, contact, address1)
  }

  // delete user ( id )

  // if admin, delete usr from all list
  // if admin, update an user to admin
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', bgcolor: 'rgba(255, 240, 174, .75)' }}>
        <Tabs
          classes={{ root: classes.root, scroller: classes.scroller }}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '4em', position: 'fixed', zIndex: 1, bgcolor: 'white', marginLeft: 'auto', marginRight: 'auto', 'root': {'&.Mui-selected': { color: 'white'}}, }}
        >
          <Tab label='Dashboard' {...allyProps(0)} />
          <Tab label='Account' {...allyProps(1)} />
        </Tabs>
        { !userData ?
          <TabPanel value={value} index={0}>
            <Grid container sx={{ marginTop: '7em'}}>
              <Grid xs={12} >
                <CircularProgress />
                <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', borderBottom: '2px solid #dc5a41', marginBottom: '.5em', paddingBottom: '.5em'}}>loading data... </Typography>
              </Grid>
              <Grid xs={12} sx={{ marginBottom: '1em'}}>
                <Typography sx={{ marginBottom: '1em'}}>Click button to go back, and try again.</Typography>
                <Button variant="contained" onClick={backToHomeHandler}>Go back</Button>
              </Grid>
            </Grid>
          </TabPanel>
        :
          <>
            {/* Dashboard */}
            <TabPanel value={value} index={0} >
              <Grid container sx={{ marginTop: '7.5em', paddingLeft: '1em'}}>
                <Grid item xs={12} sx={{ marginBottom: '1.5em' }}>
                  <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Dashboard</Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'Raleway', color: '#dc5a41', borderBottom: '2px solid #dc5a41', paddingBottom: '.5em'}}>Welcome! {userData.username}</Typography>
                </Grid>
                {/* Current Orders */}
                <Grid item xs={12} >
                  <Grid container sx={{ width: '100%', padding: '1em 1em'}}>
                    <Grid item xs={12}>
                      <List>
                        <Card sx={{ padding: '1em 1em'}}>
                          <ListItemButton onClick={currentOrderHandler} sx={{ borderBottom: '1px solid #dc5a41'}}>
                            <ListItemText sx={{ color: 'darkgreen' }} primary="Current Orders" />
                            { currentOrderOpen ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={currentOrderOpen} timeout='auto' unmountOnExit>
                            <Grid container sx={{ marginTop: '1em', marginBottom: '1em', borderBottom: '1px solid gray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em'}}>
                              <Grid item xs={6} sm={2}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Order</Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Date</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Order Status</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Total</Typography>
                              </Grid>
                            </Grid>
                              {userData.Orders.map((order, i) => {
                                // received (paid) -> confirmed(confirmed) -> ready(ready)
                                // if order is paid && confirmed && ready && picked up
                                if (order.isPaid) {
                                  return (
                                    <div key={i} style={{width: '100%'}}>
                                      {order.isConfirmed ?
                                        <Grid container sx={{ marginBottom: '.5em', borderBottom: '1px solid lightgray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em'}}>
                                          <Grid item xs={6} sm={2} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              {order.OrderNumber}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} sm={4} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              {moment(order.updatedAt).format('LL')}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              Order confirmed
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              ${(order.grandTotal).toFixed(2)}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      : order.isReady ?
                                        <Grid container sx={{ marginBottom: '.5em', borderBottom: '1px solid lightgray', paddingBottom: '.5em' , paddingLeft: '1em', paddingRight: '1em'}}>
                                          <Grid item xs={6} sm={2} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              {order.OrderNumber}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} sm={4} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              {moment(order.updatedAt).format('LL')}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              Ready to pick up
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                            <Typography>
                                              ${(order.grandTotal).toFixed(2)}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      : null
                                      }                            
                                    </div>
                                  )
                                }
                              })}
                          </Collapse>
                        </Card>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Fulfilled Orders */}
                <Grid item xs={12} >
                  <Grid container sx={{ width: '100%', padding: '1em 1em'}}>
                    <Grid item xs={12}>
                      <List>
                        <Card sx={{ padding: '1em 1em'}}>
                          <ListItemButton onClick={fulfilledOrderHandler} sx={{ borderBottom: '1px solid #dc5a41'}}>
                            <ListItemText sx={{ color: 'darkgreen' }} primary="Fulfilled Orders" />
                            { fulfilledOrderOpen ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={fulfilledOrderOpen} timeout='auto' unmountOnExit>
                            <Grid container sx={{ marginTop: '1em', marginBottom: '1em', borderBottom: '1px solid gray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em'}}>
                              <Grid item xs={6} sm={2} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Order</Typography>
                              </Grid>
                              <Grid item xs={6} sm={4} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Date</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Order Status</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Total</Typography>
                              </Grid>
                            </Grid>
                              {userData.Orders.map((order, i) => {
                                // received (paid) -> confirmed(confirmed) -> ready(ready)
                                if (order.isFinished) {
                                  return (
                                    <Grid container sx={{ marginBottom: '.5em', borderBottom: '1px solid lightgray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em'}} key={i}>
                                      <Grid item xs={6} sm={2} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {order.OrderNumber}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={4} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {moment(order.updatedAt).format('LL')}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          Order fulfilled
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          ${order.grandTotal}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  )
                                }
                              })}
                          </Collapse>
                        </Card>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Current Reservations */}
                <Grid item xs={12} >
                  <Grid container sx={{ width: '100%', padding: '1em 1em'}}>
                    <Grid item xs={12}>
                      <List>
                        <Card sx={{ padding: '1em 1em' }}>
                          <ListItemButton onClick={currentReserveHandler} sx={{ borderBottom: '1px solid #dc5a41'}}>
                            <ListItemText sx={{ color: 'darkgreen' }} primary="Current Reservations" />
                            { currentReserveOpen ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={currentReserveOpen} timeout='auto' unmountOnExit>
                            <Grid container sx={{ marginTop: '1em', marginBottom: '1em', borderBottom: '1px solid gray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em' }}>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Reserve Date</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Contact Number</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Reservation Status</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Number of Party</Typography>
                              </Grid>
                            </Grid>
                              {userData.Reservations.map((reservation, i) => {
                                if (!reservation.isShowedUp) {
                                  return (
                                    <Grid container sx={{ marginBottom: '.5em', borderBottom: '1px solid lightgray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em' }} key={i}>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {moment(reservation.reserveDate).format('LLL')}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {reservation.contact}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          Reservation confirmed
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {reservation.totalParty}&nbsp;ppl
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  )
                                }
                              })}
                          </Collapse>
                        </Card>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Past Reservations */}
                <Grid item xs={12} >
                  <Grid container sx={{ width: '100%', padding: '1em 1em'}}>
                    <Grid item xs={12}>
                      <List>
                        <Card sx={{ padding: '1em 1em' }}>
                          <ListItemButton onClick={pastReserveHandler} sx={{ borderBottom: '1px solid #dc5a41'}}>
                            <ListItemText sx={{ color: 'darkgreen' }} primary="Past Reservations" />
                            { pastReserveOpen ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={pastReserveOpen} timeout='auto' unmountOnExit>
                            <Grid container sx={{ marginTop: '1em', marginBottom: '1em', borderBottom: '1px solid gray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em' }}>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Reserve Date</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Contact Number</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Reservation Status</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray'}}>Number of Party</Typography>
                              </Grid>
                            </Grid>
                              {userData.Reservations.map((reservation, i) => {
                                if (reservation.isShowedUp) {
                                  return (
                                    <Grid container sx={{ marginBottom: '.5em', borderBottom: '1px solid lightgray', paddingBottom: '.5em', paddingLeft: '1em', paddingRight: '1em' }} key={i}>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {moment(reservation.reserveDate).format('LLL')}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {reservation.contact}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          Reservation confirmed
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={3} sx={{paddingRight: '.5em'}}>
                                        <Typography>
                                          {reservation.totalParty}&nbsp;ppl
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  )
                                }
                              })}
                          </Collapse>
                        </Card>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            {/* Account */}
            <TabPanel value={value} index={1}>
              <Grid item xs={12}>
                <Grid container sx={{ marginTop: '7.5em', paddingLeft: '1em'}}>
                  <Grid item xs={12} sx={{ width: '90vw'}}>
                    <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', borderBottom: '2px solid #dc5a41', paddingBottom: '.25em'}}>Account Details</Typography>
                    <Card sx={{ width: 400, marginTop: '1.5em', marginLeft: 'auto', marginRight: 'auto', padding: '1em 1em', marginBottom: '2em'}}>
                      <List>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Name" secondary={userData.username} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Contact" secondary={userData.contact} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Email" secondary={userData.email} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Address" secondary={userData.address1 ? userData.address1 : "Not Registered"} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Total Orders" secondary={(userData.Orders).length} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Total Reservations" secondary={(userData.Reservations).length} />
                        </ListItem>
                        <ListItem>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Button onClick={acctModalHandler} variant="contained" sx={{ width: '100%' }}>Edit Profile</Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button onClick={logoutHandler} variant="outlined" sx={{ width: '100%' }}>Log out</Button>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </Card>
                    <Modal open={acctModalOpen}>
                      <Card sx={{ width: 460, position: 'fixed', left: "50%", top: 
                    '50%', transform: 'translate(-50%, -50%)', padding: '1.5em 1.5em'}}>
                        <Typography variant="h6" sx={{ color: 'darkgreen', borderBottom: '1.5px solid #dc5a41', paddingBottom: '.5em'}}>Edit Profile</Typography>
                        <form onSubmit={editAcctHandler}>
                          <Grid container sx={{ }}>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <TextField
                                type='text'
                                id='name'
                                label='Enter your name'
                                value={username}
                                variant='outlined'
                                onChange={(e) => setUsername(e.target.value)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <TextField
                                type='text'
                                id='contact'
                                label='Enter your contact number'
                                value={contact}
                                variant='outlined'
                                onChange={(e) => phoneNumberHandler(e)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <TextField
                                type='email'
                                id='email'
                                label='Enter your Email address'
                                value={email}
                                variant='outlined'
                                onChange={(e) => setEmail(e.target.value)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5em'}}>
                              <TextField
                                type='text'
                                id='address'
                                label='Enter your address'
                                value={address1}
                                variant='outlined'
                                onChange={(e) => setAddress1(e.target.value)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={4} sx={{ paddingRight: '7px'}} onClick={editAcctHandler}>
                              <Button variant="contained" sx={{ width: '100%' }}>Update profile</Button>
                            </Grid>
                            <Grid item xs={4} sx={{ paddingRight: '7px'}} onClick={acctModalCloser}>
                              <Button variant="outlined" sx={{ width: '100%' }}>close</Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button variant="outlined" sx={{ width: '100%' }}>Password Reset</Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Card>
                    </Modal>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
          </>
          
        }
      </Box> 
      <Outlet />
    </ThemeProvider>
  );
}
export default Account;