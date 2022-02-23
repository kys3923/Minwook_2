import { Grid, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import theme from '../../theme/theme'

const Footer = (props) => {

  const useStyles = makeStyles((theme) => ({
    hoursContainer: {
      paddingLeft: '2em',
    }
  }))

  const classes = useStyles();
  return (
    <div className='Footer_Container'>
      <ThemeProvider theme={theme}>
      <Grid container spacing={5}>
        <Grid item xs={6} md={4}>
          <Card elevation={0} sx={{backgroundColor: '#2c3545', color: 'white'}} className={classes.hoursContainer}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Hours
              </Typography>
              <ul className='footer_days'>
                <li>Mon, Wed, Thur, Sun</li>
                <li><em>12-9pm</em></li>
                <li>Tue</li>
                <li><em>Closed</em></li>
                <li>Fri, Sat</li>
                <li><em>12-9:30</em></li>
              </ul>
            </CardContent>
          </Card>
        </Grid> 
        <Grid item xs={6} md={4}>
          <Card elevation={0} sx={{backgroundColor: '#2c3545', color: 'white'}} className={classes.hoursContainer}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Find Us
              </Typography>
              <ul className='footer_days'>
                <li>67 Orange Turnpike<br />Sloatsburg, NY 10974</li>
                <li>(845) 712-5006</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card elevation={0} sx={{backgroundColor: '#2c3545', color: 'white'}} className={classes.hoursContainer}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Connect with us
              </Typography>
              <ul className='footer_days'>
                <li><FacebookIcon /></li>
                <li><InstagramIcon /></li>
                <li><EmailIcon /></li>
              </ul>
            </CardContent>
          </Card>
        </Grid> 
      </Grid>
      </ThemeProvider>
    </div>
    // <div className="Footer_Container">
    //   <div className="Footer_Hours">
    //     <h4>Opening Hours</h4>
    //     <ul className="footer_days">
    //       <li>Monday</li>
    //       <li>Tuesday</li>
    //       <li>Wednesday</li>
    //       <li>Thursday</li>
    //       <li>Friday</li>
    //       <li>Saturday</li>
    //       <li>Sunday</li>
    //     </ul>
    //     <ul className="footer_hours_detail">
    //       <li>12-9pm</li>
    //       <li>Closed</li>
    //       <li>12-9pm</li>
    //       <li>12-9pm</li>
    //       <li>12-9:30pm</li>
    //       <li>12-9:30pm</li>
    //       <li>12-9pm</li>
    //     </ul>
    //   </div>
    //   <div className="Footer_Contact">
    //       <h4>Contact Info</h4>
    //     <ul>
    //       <li>67 Orange Turnpike, Sloatsburg, NY 10974</li>
    //       <li>(845) 712-5006</li>
    //     </ul>
    //   </div>
    //   <div className="Footer_Social">
    //       <h4>Connect</h4>
    //     <ul>
    //       <li>facebook</li>
    //       <li>instagram</li>
    //       <li>twitter</li>
    //     </ul>
    //   </div>
    //   <div className="copyrights">
    //     <p>© 2022 Sushivill. All Rights Reserved. developed & designed by YK Technology Corporation</p>
    //   </div>
    // </div>
  );
}
export default Footer;