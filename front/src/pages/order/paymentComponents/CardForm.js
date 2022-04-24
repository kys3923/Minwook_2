import { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { formatZipCode } from './CardUtils';
import { Button, Grid, Typography, Card, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';

const Cardform = (props) => {

  // states 
  const [ pageLoading, setPageLoading ] = useState(false);
  const [ line1, setLine1 ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ cardName, setCardName ] = useState('');
  const [ postal, setPostal ] = useState('');

  // stripe
  const stripe = useStripe();
  const elements = useElements();

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Card>
          <form>
            <Grid container>
              <Grid item xs={12}>
                <Typography>call total price and simplified order</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Billing information
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CardElement />
              </Grid>
              <Grid item xs={12}>
                <Typography>Order Summary</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Button</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>By placing your order, you agree to SushiVille's Privady Policy, and Terms of Use.</Typography>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
export default Cardform;