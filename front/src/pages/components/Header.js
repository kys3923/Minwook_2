import { Link, useNavigate } from 'react-router-dom';

// MUI components
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, Paper, Grid, Stack, Button } from '@mui/material/';
import SetMealIcon from '@mui/icons-material/SetMeal';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';

import theme from '../../theme/theme';

const Header = (props) => {

  const useStyles = makeStyles((theme) => ({
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: '80px',
      paddingTop: '0'
    },
    navItems: {
      marginRight: "1em",
    },
  }))


  const navigate = useNavigate();
  const classes = useStyles();

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Container className={classes.logoContainer}>
              <div className="logo-imagebox">
                <Link to="/"><img src='/images/logo_sushivill.png' style={{ "maxWidth": "200px" }}/></Link>
              </div>
            </Container>
          </Grid>
          <Grid className={classes.navContainer} item xs={12} md={6} lg={6} xl={6}>
            <Stack direction='row' spacing={2}>
              <Link to='order'><Button className={classes.navItems}><SetMealIcon />&nbsp;Order</Button></Link>
              <Link to='reservation'><Button className={classes.navItems}><EventAvailableIcon />&nbsp;Reservation</Button></Link>
              {!props.authUser ? <Link to='login'><Button className={classes.navItems}><LoginIcon />&nbsp;Login/Register</Button></Link>
                :
                <></>
              }
              {localStorage.role == "user" &&
                <Link to='account'><Button className={classes.navItems}><AccountBoxIcon />&nbsp;Account</Button></Link>
              }
              <Link to='cart'><Button className={classes.navItems}><ShoppingCartIcon />&nbsp;Cart</Button></Link>
            </Stack>
            {localStorage.role == "admin" && <>
              <Link to='dashboard'><Button className={classes.navItems}><DashboardIcon /> Dashboard</Button></Link>
              <Link to='/menu'><Button className={classes.navItems}>Menu Management</Button></Link>
            </>
            }
            <Paper className={classes.navItems}>
              {/* <button onClick={logoutHandler}>Logout</button> */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
export default Header;