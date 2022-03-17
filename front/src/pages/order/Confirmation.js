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
  const [ tax, setTax ] = useState(8.875);
  const [ creditCardFee, setCreditCardFee ] = useState(0.03);

  // Handlers

  const sauceOpenHandler = (e) => {
    SetSauceOpen(!sauceOpen);
  }

  const drinkOpenHandler = (e) => {
    SetDrinkOpen(!drinkOpen);
  }

  const addOnSauceHandler = (e) => {
    
  }

  const checkHandler = (e) => {
    console.table(finalCart);
  }

  useEffect(() => {
    async function setFinalCartItems() {
      await setFinalCart(props.cart);
      await setSubTotal(props.subTotal);
    }
    setFinalCartItems();
  },[props.cart, props.subTotal])

  // add modifiy item function - addon , comment
  // modify options - item-no sauce, extra sauce, seared, 
  // add terms of conditions
  // add subtotal
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: '400px', maxWidth: '800px', padding: '3em 3em', margin: '0 auto', backgroundColor: 'rgba(255, 249, 220, 1)' }} >
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ fontFamily: 'Raleway', fontWeight: 'bold', paddingBottom: '.5em', marginBottom: '1em', borderBottom: '2px solid #dc5a41' }}>
            <Typography variant='h4' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>Order Confirmation</Typography>
          </Grid>
          {/* Order details */}
          <Grid item xs={12} md={6} sx={{ marginBottom: '1em' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Order Details</Typography>
              </Grid>
              {finalCart.map((item, i) => (
                <Grid item xs={12} key={i}>
                  <Card sx={{ padding: '1em 1em' }}>
                    <Grid container >
                      <Grid item xs={7}>
                        <Typography sx={{ color: '#dc5a41', fontSize: '1.1125em' }}>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontStyle: 'italic'}}>x{item.qty}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ color: 'darkgreen', marginBottom: '.5em' }}>${item.price}</Typography>
                      </Grid>
                      {item.options ? <>
                        { item.options.map((option, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={7}>
                              {option.selected ? <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;{option.name}</Typography> : null }
                            </Grid>
                            <Grid item xs={2}>
                              {option.selected ? <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>x{item.qty}</Typography> : null }
                            </Grid>
                            <Grid item xs={3}>
                              {option.selected ? <>
                                {option.name === 'Brown Rice' || option.name === 'Soy Paper' || option.name === 'Crunch' ?
                                  <Typography sx={{ color: 'gray' }}>${(option.price.toFixed(2))}</Typography>
                                  : null
                                }
                              </> : null }
                            </Grid>
                          </Grid>
                        ))}
                      </> : null}
                      {item.caliOrSpTuna ? 
                      <Grid container direction='row' justifiyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.caliOrSpTuna}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.salGoneOrRain ? 
                      <Grid container direction='row' justifiyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.salGoneOrRain}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.name === 'Pick 3 Rolls Lunch' ? 
                      <>
                        {item.rollChoices.map((choice, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 1 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll1}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 2 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll2}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 3 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll3}</Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </> : null }
                      {item.name === 'Pick 2 Rolls Lunch' ? 
                      <>
                        {item.rollChoices.map((choice, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 1 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll1}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 2 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll2}</Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </> : null }
                      {item.spicyOrSweet ? 
                      <Grid container direction='row' justifiyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.spicyOrSweet}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.porkOrVeg ? 
                      <Grid container direction='row' justifiyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.porkOrVeg}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.comments ? 
                      <Grid container direction='row' justifiyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Instructions:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.comments}</Typography>
                        </Grid>
                      </Grid> : null}
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        {/* ADD Sauce Drinks */}
          <Grid item xs={12} md={6} sx={{ marginBottom: '1em'}}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Add On</Typography>
              </Grid>
              <Grid item xs={12}>
                <List>
                  <Card>
                    <ListItemButton onClick={sauceOpenHandler} sx={{ backgroundColor: 'white', borderRadius: '5px'}}>
                      <ListItemText sx={{ color: 'darkgreen' }} primary='Sauces' />
                      { sauceOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse>
                      <FormGroup>
                        
                      </FormGroup>
                    </Collapse>
                  </Card>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={checkHandler}>Check</Button>



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
          Sub Total: ${subTotal}
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="I agree with the terms and conditions." />
          <Button variant='contained'>Check Out Order</Button>
          <Button onClick={props.closeConfirmation}>Continue Shopping</Button>
        </FormGroup>
      </Card>
    </ThemeProvider>
  );
}
export default Confirmation;