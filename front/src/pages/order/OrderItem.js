import { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Card, Typography, Button, Chip, Stack, Grid, ToggleButtonGroup, ToggleButton, FormGroup, FormControlLabel, TextField, Collapse, List, ListItemButton, ListItemText, Switch, Checkbox, RadioGroup, Radio } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const OrderItem = (props) => {
  
  // states
  const [ item, setItem ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ optionOpen, setOptionOpen ] = useState(false);
  const [ itemQty, setItemQty ] = useState(1);
  const [ subTotal, setSubTotal ] = useState(0);
  const [ brownRice, setBrownRice ] = useState(false);
  const [ soyPaper, setSoyPaper ] = useState(false);
  const [ spicyMayo, setSpicyMayo ] = useState(false);
  const [ eelSauce, setEelSauce ] = useState(false);
  const [ crunch, setCrunch ] = useState(false);
  const [ tunaOrSalmon, setTunaOrSalmon ] = useState('Not selected');
  const [ spicyOrSweet, setSpicyOrSweet ] = useState('Not selected');
  const [ caliOrSpTuna, setCaliOrSpTuna ] = useState('Not Selected');
  const [ SalGoneOrRain, setSalGoneOrRain ] = useState('Not Selected');
  const [ instruction, setInstruction ] = useState('');
  const [ roll1, setRoll1 ] = useState('');
  const [ roll2, setRoll2 ] = useState('');
  const [ roll3, setRoll3 ] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/${props.product}`, config);
      
      setItem(data);
      setDataLoaded(true);
    }
    fetchData();
  },[props.product]);

  // Handlers

  const addNum = (e) => {
    e.preventDefault();
    setItemQty(
      itemQty+1
    )
  };

  const subNum = (e) => {
    e.preventDefault();
    if (itemQty > 1) {
      setItemQty(
        itemQty-1
      )
    } else {
      setItemQty(1)
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setItemQty(e.target.value);
  };

  const optionOpenHandler = (e) => {
    setOptionOpen(!optionOpen);
  }

  const brownRiceHandler = (e) => {
    if (e.target.checked) {
      setBrownRice(true)
    } else {
      setBrownRice(false)
    }
  }

  const soyPaperHandler = (e) => {
    if (e.target.checked) {
      setSoyPaper(true)
    } else {
      setSoyPaper(false)
    }
  }

  const spicyMayoHandler = (e) => {
    if (e.target.checked) {
      setSpicyMayo(true)
    } else {
      setSpicyMayo(false)
    }
  }

  const eelSauceHandler = (e) => {
    if (e.target.checked) {
      setEelSauce(true)
    } else {
      setEelSauce(false)
    }
  }

  const crunchHandler = (e) => {
    if (e.target.checked) {
      setCrunch(true)
    } else {
      setCrunch(false)
    }
  }

  const tunaSalHandler = (e) => {
    setTunaOrSalmon(e.target.value);
  }

  const instructionHandler = (e) => {
    setInstruction(e.target.value);
  }

  const eventChecker = (e) => {
    console.log(
      brownRice, '-brownRice', 
      soyPaper, '-soy', 
      spicyMayo, '-spmayo', 
      eelSauce, '-eelS',
      crunch, '-cr',
      tunaOrSalmon, '-TunaSal',
      instruction, '-instruct'
    )
    console.log(item)
  }

  const AddToCartHandler = (e) => {
    e.preventDefault();
    let id = props.product
    let qty = itemQty
    // ------ add on order
    // brown rice
    // soy paper
    // crunch
    // ------ options
    // sp mayo
    // eel sauce
    // ------ special selections
    // tuna salmon (caption 'Tuna or Salmon')
    props.setCart([{
      id: id,
      qty: qty,
      name: item.menu.name,
      price: item.menu.price,
      caption: item.menu.caption,
      category: item.menu.category,
      Sub_Category: item.menu.Sub_Category,
      stock_availability: item.menu.stock_availability,
      description: item.menu.description,
    },...props.cart])
    props.modalCloser();
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 450, padding: '3em 3em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        { dataLoaded ? (
          <Grid container>
            {/* item name */}
            <Grid item xs={12} sx={{ paddingBottom: '.5em', marginBottom: '1em', borderBottom: '2px solid #dc5a41'}}>
              <Typography variant='h5' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>
                {item.menu.name}
              </Typography>
            </Grid>
            {/* item captions */}
            <Grid item xs={12}>
              <Stack direction='row' spacing={1} sx={{ paddingBottom: '.5em', marginBottom: '1em'}}>
                {item.menu.caption == "" ? <></> : <Chip label={item.menu.caption} size="small" variant='outlined' color='primary' sx={{ color: '#dc5a41' }}/>}
                {item.menu.category == "" ? <></> : <Chip label={item.menu.category} size="small" variant='outlined' color='primary' sx={{ color: '#dc5a41' }}/>}
                {item.menu.Sub_Category == "" ? <></> : <Chip label={item.menu.Sub_Category} size="small" variant='outlined' color='primary' sx={{ color: '#dc5a41' }}/>}
                {item.menu.stock_availability ? <Chip label='In-Stock' size='small' variant='outlined' color='primary' /> : <Chip label='Out of Stock' size="small" variant='filled' color='warning' />}
              </Stack>
            </Grid>
            {/* item descriptions */}
            <Grid item xs={12} sx={{ borderBottom: '1px solid gray'}}>
              <Typography sx={{marginBottom: '1em'}}>{item.menu.description}</Typography>
            </Grid>
            {/* item price */}
            <Grid item xs={12}>
              <Grid container sx={{ paddingTop: '1em'}}>
                <Grid item xs={3}>
                  <Typography sx={{lineHeight: '2em', fontStyle: 'italic', color: 'gray' }}>Price: </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant='h5' color='primary' sx={{marginBottom: '1em'}}>${(item.menu.price).toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* item qty */}
            <Grid item xs={12}>
              <Grid container sx={{ marginBottom: '1em' }}>
                <Grid item xs={3}>
                  <Typography sx={{ lineHeight: '2.5em', fontStyle: 'italic', color: 'gray'}}>Quantity:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <ToggleButtonGroup>
                    <ToggleButton size='small' onClick={subNum} value='on'>
                      <RemoveOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton size='small' disabled value='off'>
                      <input type='number' value={itemQty} onChange={handleChange} style={{ margin: '0 0', padding: '0 0', width: '2em', border: 'none', textAlign: 'center', height: '2em', fontWeight: 'bold'}}/>
                    </ToggleButton>
                    <ToggleButton size='small' onClick={addNum} value='on'>
                      <AddOutlinedIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Grid>
            {/* options */}
            <Grid item xs={12}>
              <List>
                <ListItemButton onClick={optionOpenHandler} sx={{ backgroundColor: '#f1f1f1', borderRadius: '5px'}}>
                  <ListItemText primary='Options' sx={{ color: '#dc5a41', fontStyle: 'italic' }} />
                  { optionOpen ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
                <Collapse in={optionOpen} timeout='auto' unmountOnExit>
                  <FormGroup>
                    <Grid container>
                      {/* Naruto */}
                      { item.menu.name == 'Naruto' ? <></> :
                        <>
                          {/* Tuna/salmon */}
                          { item.menu.caption == 'Tuna or Salmon' ? 
                            <Grid item xs={12}>
                              <RadioGroup
                                row
                                name='tunaOrSalmon'
                                value={tunaOrSalmon}
                                onChange={tunaSalHandler}
                                sx={{ justifyContent: 'center' }}
                              >
                                <FormControlLabel value='Tuna' control={<Radio />} label='Tuna' />
                                <FormControlLabel value='Salmon' control={<Radio />} label='Salmon' />
                              </RadioGroup>
                            </Grid>
                            :
                            <></>
                          }
                          {/* brown rice */}
                          <Grid item xs={6}>
                            <FormControlLabel control={<Switch onChange={brownRiceHandler} />} label='Brown Rice +$1.00' />
                          </Grid>
                          {/* Soy paper */}
                          { item.menu.caption !== 'Soy Paper' ? 
                            <Grid item xs={6}>
                              <FormControlLabel control={<Switch onChange={soyPaperHandler} />} label='Soy Paper +$1.00' />
                            </Grid>
                            :
                            <></>
                          }
                        </>
                      }
                      {/* crunch */}
                      <Grid item xs={6}>
                        <FormControlLabel control={<Switch onChange={crunchHandler} />} label='Crunch topping +$0.50' />
                      </Grid>
                      {/* spicy mayo */}
                      <Grid item xs={6}>
                        <FormControlLabel control={<Switch onChange={spicyMayoHandler} />} label='Spicy Mayo topping' />
                      </Grid>
                      {/* eel sauce */}
                      <Grid item xs={6}>
                        <FormControlLabel control={<Switch onChange={eelSauceHandler} />} label='Eel Sauce topping' />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField multiline maxRows={4} value={instruction} onChange={instructionHandler} variant='outlined' placeholder='Special Instructions' sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button onClick={eventChecker}>Check</Button>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Collapse>
              </List>
            </Grid>
            {/* sub total */}
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ lineHeight: '2em', fontStyle: 'italic', color: 'gray' }}>Total:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant='h5' color='primary'>${(item.menu.price*itemQty).toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* buttons */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  { item.menu.stock_availability ?
                    <Button
                      variant='contained'
                      onClick={AddToCartHandler}
                      sx={{ width: '100%' }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: '1.3em' }} />&nbsp;Add to Cart
                    </Button>
                  :
                    <Button
                      variant='contained'
                      disabled
                    >
                      Item out of stock
                    </Button>
                  }
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={(e) => props.modalCloser()} sx={{ width: '100%' }}>
                    Close Window
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          )
          :
          <Typography variant='h5' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>
            Loading...
          </Typography>
        }
      </Card>
    </ThemeProvider>
  );
};
export default OrderItem;