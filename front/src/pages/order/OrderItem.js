import { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Box, Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const OrderItem = (props) => {
  
  // states
  const [ item, setItem ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ itemQty, setItemQty ] = useState(1);
  const [ subTotal, setSubTotal ] = useState(0);
  
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
  },[props.product])

  // Handlers

  const addNum = (e) => {
    e.preventDefault();
    setItemQty(
      itemQty+1
    )
  }

  const subNum = (e) => {
    e.preventDefault();
    if (itemQty > 1) {
      setItemQty(
        itemQty-1
      )
    } else {
      setItemQty(1)
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setItemQty(e.target.value);
  }

  const AddToCartHandler = (e) => {
    e.preventDefault();
    let id = props.product
    let qty = itemQty
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
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='OrderItem_Container'>
        { dataLoaded ? (
          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
          >
            <Card elevation={10} sx={{ width: '400px', padding: '2em', backgroundColor: 'rgba(255,240,174,1)'}}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#dc5a41', fontWeight: 'bold', fontSize: '2.5em'}}>
                  {item.menu.name}
                </Typography>
                <div className='badgeGroups'>
                  <ul>
                    {item.menu.caption == "" ? <></> : <li>{item.menu.caption}</li>}
                    <li>{item.menu.category}</li>
                    {item.menu.Sub_Category == "" ? <></> : <li>{item.menu.Sub_Category}</li> }
                    <li>{ item.menu.stock_availability ? "in-stock" : "out of stock" }</li>
                  </ul>
                </div>
                <Typography variant='body1' component='div' sx={{ fontSize: '1.25em', color: '#dc5a41', marginBottom: '2em' }}>
                  ${item.menu.price}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: '2em'}}>
                  {item.menu.description}
                </Typography>
                <div className='Quantity_Container'>
                  <p className='QTY_lable'>Quantity:</p>
                  <div className='Quantity_Number'>
                    <Button sx={{ height: '2em', marginTop: '6px', marginLeft: '1em', marginRight: '.25em'}} onClick={subNum} variant='contained'><RemoveOutlinedIcon /></Button>
                    <input type='number' value={itemQty} onChange={handleChange} style={{ textAlign: 'center', width: '50px', height: '2em', fontWeight: 'bold'}} />
                    {/* <TextField variant='standard' sx={{ height: '1em', width: '50px', textAlign: 'center' }} value={itemQty} onChange={handleChange} /> */}
                    <Button onClick={addNum} sx={{ height: '2em', marginTop: '6px', marginLeft: '.25em', marginRight: '.25em'}} variant='contained'><AddOutlinedIcon /></Button>
                  </div>
                </div>
                <Typography variant='body1' component='div' sx={{ marginTop: '2em', marginBottom: '1em', fontSize: '1.25em', color: '#dc5a41'}}>
                  <span id='subtotal'>Total Price</span>&nbsp;&nbsp;${(item.menu.price*itemQty).toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                { item.menu.stock_availability ?
                  <Button
                    variant='contained'
                    onClick={AddToCartHandler}
                  >
                    <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                  </Button>
                :
                  <Button
                    variant='contained'
                    disabled
                  >
                    Item out of stock
                  </Button>
                }
                <Button onClick={(e) => props.modalCloser()}>
                  Close Window
                </Button>
              </CardActions>
            </Card>
          </Box>
        )
        :
        <p>Loading...</p>}
      </div>   
    </ThemeProvider>
  );
}
export default OrderItem;