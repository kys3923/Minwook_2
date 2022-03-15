import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Confirmation from './Confirmation';


// MUI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Card, CardContent, Typography, CardActions, Button, IconButton, Grid, Modal } from '@mui/material';


// Badge style

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -10,
    top: -15,
    padding: '14px 12px',
    fontSize: '1em',
    borderRadius: '20px'
  },
}));

const Cart = (props) => {

  // states
  const [ cartItemCount, setCartItemCount ] = useState(0);
  const [ cartItemOpen, setCartItemOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ subTotal, setSubTotal ] = useState();
  const [ removeItem, setRemoveItem ] = useState('')
  const [ confirmationOpen, setConfirmationOpen ] = useState(false);

  
  useEffect(() => {
    async function setItemCount() {
      let cartTotal = props.cart;
      await setCartItems(cartTotal);
      await setCartItemCount((cartTotal).length);
    }
    setItemCount();
  },[props.cart])

  
  // handlers
  const cartClickHandler = (e) => {
    let cartOpening = props.setCartOpened;
    cartOpening(!props.cartOpened);
    setCartItemOpen(!cartItemOpen);
    let initialValue = 0
    let totalValue = cartItems.reduce(function (prevValue, currentValue) {
      return prevValue + (currentValue.price * currentValue.qty)
    }, initialValue);
    setSubTotal((totalValue).toFixed(2));
  }

  const removeItemhandler = (e) => {
    e.preventDefault();
    setCartItemOpen(false);
    async function removeItemFromState() {
      await setRemoveItem(e.currentTarget.value);
      if (removeItem) {
        const filteredCartItems = props.cart.filter(item => item.id != removeItem)
        props.setCart(filteredCartItems);
        setRemoveItem('');
      }
    }
    removeItemFromState();
    console.log(props.cart, "props", cartItems, "cart page");
  }

  // console.table(cartItems)
  
  return (
    <ThemeProvider theme={theme}>
      { cartItemOpen ? 
        <div className='cartItemWrapper'>
          <div className='cartItemDetail'>
            { cartItemCount == 0 ? 
              <Card
                sx={{ padding: '.75em .75em' }}
              >
                <CardContent>
                  <Typography gutterBottom variant='h5' sx={{ borderBottom: '2px solid #dc5a41', paddingBottom: '.25em'}}>
                    Shopping Cart
                  </Typography>
                  <Typography variant='body2' sx={{ marginTop: '2em', marginBottom: '2em'}}>
                    Your cart is currently empty.
                  </Typography>
                  <Button onClick={cartClickHandler} variant='contained'>
                    <ShoppingCartIcon /> Continue Order
                  </Button>
                </CardContent>
              </Card>
              :
              <Card
                sx={{ padding: '.75em .75em' }}
              >
                <CardContent>
                  <Typography gutterBottom variant='h5' sx={{ borderBottom: '2px solid #dc5a41', paddingBottom: '.25em'}}>
                    Shopping Cart
                  </Typography>
                  {cartItems.map((item, i) => (
                    <Card key={i} elevation={0} sx={{ borderBottom: '1px solid gray', padding: '5px 0', borderRadius: '0'}}>
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={6}>
                          <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ fontStyle: 'italic'}}>x{item.qty}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ color: 'darkgreen'}}>${item.price}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={removeItemhandler} className='cart_remove_button' value={item.id} sx={{ marginLeft : '10px'}}>
                            <RemoveCircleOutlineIcon sx={{ color: 'gray'}} />
                          </IconButton>                       
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                  <Typography sx={{ marginTop: '1em', fontSize: '1em'}}>
                    Sub Total: <span className='subTotal_text'>$&nbsp;{subTotal}</span>
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: 'row', }}>
                  <Button onClick={cartClickHandler} variant='contained'>
                    <ShoppingCartCheckoutIcon />&nbsp;CheckOut Order
                  </Button>
                  <Button onClick={cartClickHandler} variant='outlined'>
                    <ShoppingCartIcon /> &nbsp;Continue Order
                  </Button>
                </CardActions>
              </Card>
            }
          </div>  
        </div>
        :
        <></>    
      }
      <Modal open={confirmationOpen} sx={{overflow: 'scroll'}}>
        <Bar>
          <Confirmation allItem={props.allitem} cart={cartItems}/>
        </Bar>
      </Modal>
      <div className="cartContainer" onClick={cartClickHandler}>
        <StyledBadge badgeContent={cartItemCount} color='primary'>
          <ShoppingCartIcon sx={{ fontSize: '1.75em'}}/>
        </StyledBadge>
      </div>    
    </ThemeProvider>
  );
}

const Bar = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
))

export default Cart;