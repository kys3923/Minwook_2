import { Card, Stack, CardContent, Typography, Button, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import theme from '../../theme/theme'

const Footer = (props) => {
  return (
    <div className='Footer_Container'>
      <ThemeProvider theme={theme}>
        <Stack 
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={5}
        >
          <Card elevation={0} sx={{display: 'flex', justifyContent: 'flex-start', backgroundColor: '#2c3545', color: 'white'}} className="hoursContainer">
              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  Hours
                </Typography>
                <ul className='footer_days'>
                  <li>Mon, Wed, Thur, Sun: <em>12-9pm</em></li>                  
                  <li>Tue: <em>Closed</em></li>
                  <li>Fri, Sat: <em>12-9:30</em></li>
                </ul>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{display: 'flex', justifyContent: 'flex-start',backgroundColor: '#2c3545', color: 'white'}} className="hoursContainer">
              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  Find Us
                </Typography>
                <ul className='footer_days'>
                  <li>67 Orange Turnpike<br />Sloatsburg, NY 10974</li>
                  <li>(845) 712-5006</li>
                </ul>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{display: 'flex', justifyContent: 'flex-start',backgroundColor: '#2c3545', color: 'white', paddingRight: "2.5em"}} className="hoursContainer">
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                Connect us
              </Typography>
              <ul className='footer_connect'>
                <li><IconButton sx={{color: 'white'}}><FacebookIcon /></IconButton></li>
                <li><IconButton sx={{color: 'white'}}><InstagramIcon /></IconButton></li>
                <li><IconButton sx={{color: 'white'}}><EmailIcon /></IconButton></li>
              </ul>
            </CardContent>
          </Card>
        </Stack>
      </ThemeProvider>
      <div className="copyrights">
        <p>© 2022 Sushivill. All Rights Reserved. developed & designed by YK Technology Corporation</p>
      </div>
    </div>
  );
}
export default Footer;