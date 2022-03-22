import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

// MUI
import { TextField, Grid, Typography, Button, Tabs, Tab, Box, List, ListItemButton, ListItemText, Collapse, Card } from "@mui/material";
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

const Account = (props) => {

  const [ id, setId ] = useState('');
  const [ userData, setUserData ] = useState(null);
  const [ value, setValue ] = useState(0);
  const [ currentOrderOpen, setCurrentOrderOpen ] = useState(false);
  const [ fulfilledOrderOpen, setFulfilledOrderOpen ] = useState(false);
  const [ currentReserveOpen, setCurrentReserveOpen ] = useState(false);
  const [ pastReserveOpen, setPastReserveOpen ] = useState(false);

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
  }, [])

  const navigate = useNavigate();

  // Handlers

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
  // Log Out

  // edit user ( username, contact, password, address1, email )

  // delete user ( id )

  // if admin, delete usr from all list
  // if admin, update an user to admin
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          classes={{ root: classes.root, scroller: classes.scroller }}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '4em', position: 'fixed', zIndex: 1, bgcolor: 'white', marginLeft: 'auto', marginRight: 'auto', 'root': {'&.Mui-selected': { color: 'white'}}, }}
        >
          <Tab label='Dashbord' {...allyProps(0)} />
          <Tab label='Account' {...allyProps(1)} />
          <Tab label='Orders' {...allyProps(2)} />
          <Tab label='Reservations' {...allyProps(3)} />
        </Tabs>
        { !userData ?
          <TabPanel value={value} index={0}>
            <Grid container sx={{ marginTop: '5em'}}>
              <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Found Problem in loading data. </Typography>
              <Typography>Click button to go back, and try again.</Typography>
              <Button>Go back</Button>
            </Grid>
          </TabPanel>
        :
          <>
            {/* Dashboard */}
            <TabPanel value={value} index={0} >
              <Grid container sx={{ marginTop: '7.5em', paddingLeft: '1em'}}>
                <Grid item xs={12} sx={{ marginBottom: '1.5em' }}>
                  <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Dashbord</Typography>
                  <Typography>Welcome! {userData.username}</Typography>
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
                                              ${order.grandTotal}
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
                                              ${order.grandTotal}
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
                  <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Account Details</Typography>
                </Grid>
              </TabPanel>
              {/* Orders */}
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Orders</Typography>
                </Grid>
              </TabPanel>
              {/* Reservations */}
              <TabPanel value={value} index={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Reservations</Typography>
                </Grid>
              </TabPanel>
          </>
          
        }
      </Box>
      <div className="loginContainer">
        <button onClick={logoutHandler}>Logout</button>
        {userData ? console.log(userData) : <p>userData not found</p>}
        <Outlet />
      </div>  
    </ThemeProvider>
  );
}
export default Account;