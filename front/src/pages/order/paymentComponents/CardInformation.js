import { formatZipCode } from "./CardUtils";
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';
import countries from '../../../Util/countries.json';
import states from '../../../Util/states.json';

const CardInformation = (props) => {

  // handler
  const cardStateInput = (e) => {
    props.cardStateHandler(e.target.value)
  }

  const cardCountryInput = (e) => {
    props.cardCountryHandler(e.target.value)
  }

  const cardPostalInput = (e) => {
    props.cardPostalHandler(formatZipCode(e.currentTarget.value))
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Card Information</Typography>
            <ul>
              <li>line1 = {props.line1}</li>
              <li>city = {props.city}</li>
              <li>state = {props.state}</li>
              <li>country = {props.country}</li>
              <li>cardName = {props.cardName}</li>
              <li>postal = {props.postal}</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              size='small'
              type='text'
              value={props.cardName}
              label='Name on the card'
              sx={{width: '100%'}}
              onChange={props.cardNameHandler}
              />
            </Grid>
          <Grid item xs={12}>
            <TextField 
              size='small'
              type='text'
              value={props.line1}
              label='Address'
              sx={{width: '100%'}}
              onChange={props.cardAddressHandler}
              />
            </Grid>
          <Grid item xs={12}>
            <TextField 
              size='small'
              type='text'
              value={props.city}
              label='City'
              sx={{width: '100%'}}
              onChange={props.cardCityHandler}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              size='small'
              type='text'
              value={props.postal}
              label='Zip Code'
              sx={{width: '100%'}}
              onChange={cardPostalInput}
              />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: '100%'}}>
              <InputLabel>State</InputLabel>
              <Select
                value={props.state}
                size='small'
                label='State'
                sx={{ width: '100%'}}
                onChange={cardStateInput}
                >
                {states.map((state, i) => (
                  <MenuItem
                  value={state.name}
                  key={i}
                  >
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={props.country}
                size='small'
                label='Country'
                onChange={cardCountryInput}
                >
                {countries.map((country, i) => (
                  <MenuItem
                  value={country.country}
                  key={i}
                  >
                      {country.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default CardInformation;