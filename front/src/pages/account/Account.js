import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { TextField, Grid, Typography, Button, Tabs, Tab, Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '../../theme/theme';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

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


  // Reservation History

  // Order History

  // Log Out

  // edit user ( username, contact, password, address1, email )

  // delete user ( id )

  // if admin, delete usr from all list
  // if admin, update an user to admin
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}>
        <Tabs
          classes={{ root: classes.root, scroller: classes.scroller }}
          variant="scrollable"
          value={value}
          allowScrollButtonsMobile='true'
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
                <Grid item xs={12} >
                  <Grid container sx={{ width: '100%', bgcolor: 'lightpink'}}>
                    <Grid item xs={12}>
                      <Typography variant='h6' sx={{ color: '#dc5a41'}}>
                        Current Orders
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Order</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Date</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Order Status</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Total</Typography>
                    </Grid>
                  </Grid>
                  {userData.Orders.map((order, i) => (
                    <Grid item xs={3} key={i}>
                      {order.OrderNumber}
                    </Grid>
                    // <Typography>{order.OrderNumber}</Typography>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' sx={{ color: '#dc5a41'}}>
                    Fulfilled Orders
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' sx={{ color: '#dc5a41'}}>
                    Current Reservations
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' sx={{ color: '#dc5a41'}}>
                    Fulfilled Reservations
                  </Typography>
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
        { !userData ? 
          <div className="error_account">
            <h3>Error getting your data. Please logout and login again.</h3>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        :
          <div className="accountContainer">
            <h1>Welcome! {userData.username}</h1>
            <p>Order History</p>
            <ul>
              { userData.Orders.map((order, i) => {
                return <li key={i}>{order.updatedAt}, total price <button>click to view detail</button></li>
              })}
            </ul>
            <p>personal info</p>
              <ul>
                <li>Name: {userData.username}</li>
                <li>Contact Number: {userData.contact}</li>
                <li>Contact email: {userData.email}</li>
              </ul>
              <button>update personal information</button>
            <p>Reservation History</p>
            <ul>
              { userData.Reservations.map((reserve, i) => {
                return <li key={i}>{reserve.reserveDate}, totalParty, </li>
              })}
            </ul>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        }
        {userData ? console.log(userData) : <p>userData not found</p>}
        <Outlet />
      </div>  
    </ThemeProvider>
  );
}
export default Account;