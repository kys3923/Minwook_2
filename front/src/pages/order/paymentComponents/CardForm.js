import { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { formatZipCode } from './CardUtils';
import { Button, Grid, Typography, Card, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';
import CardInformation from './CardInformation';
import styled from "@emotion/styled";


const Cardform = (props) => {

  // states 
  const [ pageLoading, setPageLoading ] = useState(false);
  const [ paymentProcessing, setPaymentProcessing ] = useState(false);
  const [ line1, setLine1 ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ cardName, setCardName ] = useState('');
  const [ postal, setPostal ] = useState('');


  // stripe
  const stripe = useStripe();
  const elements = useElements();

  const CardElementContainer = styled.div`
    height: 15px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;

    & .StripeElement {
      width: 100%;
      padding: 15px;
      border: 1px solid gray;
      border-radius: 4px;
    }
  `;

  // handlers
  const cardNameHandler = (e) => {
    setCardName(e.currentTarget.value);
  }

  const cardAddressHandler = (e) => {
    setLine1(e.currentTarget.value);
  }
  const cardCityHandler = (e) => {
    setCity(e.currentTarget.value);
  }

  const cardPostalHandler = (value) => {
    setPostal(value);
  }

  const cardStateHandler = (value) => {
    setState(value)
  }

  const cardCountryHandler = (value) => {
    setCountry(value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setPaymentProcessing(true);

    const billingDetails = {
      name: cardName,
      address: {
        city: city,
        line1: line1,
        state: state,
        postal_code: postal
      }
    }

    console.log(Number(props.total.toFixed(2)))

    const cardElement = elements.getElement('card');

    // TODO: call server to receive the data

  }

  const cardElementOpts = {
    iconStyle: 'solid',
    hidePostalCode:  true
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Card sx={{ padding: '1em 1em'}}>
          <form onSubmit={handleFormSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <CardInformation 
                  line1={line1}
                  city={city}
                  state={state}
                  country={country}
                  cardName={cardName}
                  postal={postal}
                  cardNameHandler={cardNameHandler}
                  cardAddressHandler={cardAddressHandler}
                  cardCityHandler={cardCityHandler}
                  cardStateHandler={cardStateHandler}
                  cardCountryHandler={cardCountryHandler}
                  cardPostalHandler={cardPostalHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <CardElementContainer>
                  <CardElement 
                    options={cardElementOpts}
                  />
                </CardElementContainer>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton disabled={paymentProcessing || !stripe} loading={paymentProcessing} variant="contained" type='submit' sx={{ width: '100%'}}>Pay ${(props.total).toFixed(2)}</LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
export default Cardform;