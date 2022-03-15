import { useState, useEffect } from 'react';
// TODO: import use navigate to home

// Mui
import { Button, TextField, Card, Grid, Typography, FormGroup, FormControlLabel, Checkbox, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Confirmation = (props) => {
  // States
  const [ finalCart, setFinalCart ] = useState([]);
  const [ addOns, SetAddOns ] = useState([]);
  const [ subTotal, setSubTotal ] = useState();
  const [ removeItem, setRemoveItem ] = useState('');
  const [ sauceOpen, SetSauceOpen ] = useState(false);
  const [ drinkOpen, SetDrinkOpen ] = useState(false);
  const [ addOnSauce, setAddOnSauce ] = useState([]);
  const [ addOnDrink, setAddOnDrink ] = useState([]);

  // Handlers

  const sauceOpenHandler = (e) => {
    SetSauceOpen(!sauceOpen);
  }

  const drinkOpenHandler = (e) => {
    SetDrinkOpen(!drinkOpen);
  }

  const addOnSauceHandler = (e) => {
    e.preventDefault();
    
  }

  useEffect(() => {
    async function setFinalCartItems() {
      await setFinalCart(props.cart);

    }
    setFinalCartItems();
  },[])

  // add modifiy item function - update qty, remove, addon , comment
  // modify options - item-no sauce, extra sauce, seared, 
  // add terms of conditions
  // add subtotal
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 400, margin: '0 auto', padding: '3em 3em' }} >
        <Typography variant='h5' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>
          Order Confirmation
        </Typography>
        <Typography variant='h6' sx={{ color: '#dc5a41', marginTop: '2em', borderBottom: '1px solid #dc5a41', marginBottom: '1em'}}>
          Order Details
        </Typography>
          {finalCart.map((item, i) => (
            <Card elevation={0} sx={{ marginBottom: '1em', borderBottom: '1px solid gray', borderRadius: '0'}}>
              <Grid key={i} container spacing={2} direction='row' alignItems='center' sx={{ }}>
                <Grid item xs={6}>
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>${item.price}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>x{item.qty}</Typography>
                </Grid>
                <Grid item >
                  <Button sx={{ color: 'gray'}}><EditIcon />Edit</Button>
                </Grid>
                <Grid item >
                  <Button sx={{ color: 'gray'}}><DeleteIcon />Delete</Button>
                </Grid>
                <Grid item >
                  <Button sx={{ color: 'gray'}}><MessageIcon />Comment</Button>
                </Grid>
              </Grid>
            </Card>
          ))}
        <Typography variant='h6' sx={{ color: '#dc5a41', marginTop: '2em', borderBottom: '1px solid #dc5a41'}}>
          Add-On - sauces, drinks
        </Typography>
        <List>
          <ListItemButton onClick={sauceOpenHandler}>
            <ListItemText sx={{ color: 'darkgreen' }} primary='Sauces' />
            { sauceOpen ? <ExpandLess /> : <ExpandMore /> }
          </ListItemButton>
          <Collapse in={sauceOpen} timeout='auto' unmountOnExit>
            <FormGroup>
              {props.allItem.menu.map((item, i) => {
                if (item.category == 'Sauce') {
                  return (
                    <FormControlLabel control={<Checkbox />} label={item.name} key={i} value={item._id}/>
                  )
                }})}
                <Button type='submit'>Add to the order</Button>
            </FormGroup>
          </Collapse>
          <ListItemButton onClick={drinkOpenHandler}>
            <ListItemText sx={{ color: 'darkgreen' }} primary='Drinks' />
            { drinkOpen ? <ExpandLess /> : <ExpandMore /> }
          </ListItemButton>
          <Collapse in={drinkOpen} timeout='auto' unmountOnExit>
          </Collapse>
        </List>
        <Typography variant='h6' sx={{ color: '#dc5a41', marginTop: '2em', borderBottom: '1px solid #dc5a41', marginBottom: '1em'}}>
          Sub Total: $12.95
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="I agree with the terms and conditions." />
          <Button variant='contained'>Check Out Order</Button>
          <Button>Continue Shopping</Button>
        </FormGroup>
      </Card>
    </ThemeProvider>
  );
}
export default Confirmation;