import React, { useState, useEffect } from 'react';
import axios from 'axios';

// body scroll lock

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

//TODO: ADD MODAL FOR CART SECTION

import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import theme from '../../theme/theme';

import OrderItem from './OrderItem';
import Cart from './Cart';
import Confirmation from './Confirmation';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div className='thebox'>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function allyProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}


const Order = (props) => {
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ value, setValue ] = useState(0);
  const [ qty, setQty ] = useState(1);
  const [ cartOpened, setCartOpened ] = useState(false);
  const [ cart, setCart ] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ product, setProduct ] = useState('');
  const [ itemOpen, setItemOpen ] = useState(false);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);
      setProducts(data);
      setDataLoaded(true);
    }
    fetchData();
  },[])
  
  // button handlers

  const cartClearHandler = (e) => {
    e.preventDefault();

    setCart([]);
  }

  const favButtonHandler = () => {
    alert('currently under constrtuction')
  }

  const modalOpener = (e) => {
    e.preventDefault();
    setItemOpen(true);
    setProduct(e.target.value)
  }

  const modalCloser = (e) => {
    setItemOpen(false);
  }

  itemOpen ? disableBodyScroll(document) : enableBodyScroll(document);
  cartOpened ? disableBodyScroll(document) : enableBodyScroll(document);
  
  return (
    <ThemeProvider theme={theme}>
      <div className="orderContainer">
        { !dataLoaded ? (
          <h2>Loading...</h2>
        ) : (
          <div className='order_left'>
            { itemOpen? <OrderItem modalCloser={modalCloser} product={product} cart={cart} setCart={setCart}/> : <></>}
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
            >
              <Tabs
                orientation='horizontal'
                variant='scrollable'
                scrollButtons
                allowScrollButtonsMobile
                value={value}
                onChange={handleChange}
                sx={{ borderBottom: 1, borderColor: 'divider'}}
              >
                <Tab label="Special Rolls" {...allyProps} />
                <Tab label="Regular Rolls" {...allyProps} />
                <Tab label="Lunch Special" {...allyProps} />
                <Tab label="Appetizer" {...allyProps} />
                <Tab label="Soup & Salad" {...allyProps} />
                <Tab label="Kitchen Entree" {...allyProps} />
                <Tab label="Sushi & Sashimi" {...allyProps} />
                <Tab label="A La Carte" {...allyProps} />
                <Tab label="Party Platter" {...allyProps} />
              </Tabs>
            </Box>
              <TabPanel value={value} index={0} sx={{ minWidth: '250px'}}>
                <p className='order_panel_title'>Special Rolls</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.category === 'Special Rolls') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <p className='order_panel_title'>Regular Rolls</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.category === 'Regular Rolls') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_title2'>Vegetable Rolls</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.category === 'Vegetable Rolls') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <p className='order_panel_title'>Lunch Special</p>
                <p className='order_panel_subtitle'>Bento Lunch</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Bento Lunch') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Sushi & Sashimi Lunch</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Sushi & Sashimi Lunch') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <div className='menuCardLunchContainerOrder'>
                  {/* TODO: add selection for adding to cart */}
                  <h3>Roll Selections</h3>
                  <ul>
                    <li>California Roll</li>
                    <li>Tuna Avocado Roll</li>
                    <li>Tuna Roll</li>
                    <li>Smoked Salmon Roll</li>
                    <li>Mango Roll</li>
                    <li>Mango Avocado Roll</li>
                    <li>Spicy Tuna Roll</li>
                    <li>Salmon Avocado Roll</li>
                    <li>Salmon Roll</li>
                    <li>Avocado Roll</li>
                    <li>Cucumber Avocado Roll</li>
                    <li>Spicy Salmon Roll</li>
                    <li>Alaska Roll</li>
                    <li>Yellowtail Roll</li>
                    <li>Cucumber Roll</li>
                    <li>AAC Roll</li>
                  </ul>
                </div>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Lunch Roll Combo') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Udon Lunch</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Udon Lunch') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <p className='order_panel_title'>Appetizer</p>
                <p className='order_panel_subtitle'>Cold Appetizer</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Cold') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Hot Appetizer</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Hot') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <p className='order_panel_title'>Soup & Salad</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.category === 'Soup & Salad') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <p className='order_panel_title'>Kitchen Entree</p>
                <p className='order_panel_subtitle'>Noodles</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Noodles') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Fried Rice</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Fried Rice') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Bento</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Bento') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Teriyaki</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Teriyaki') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Katsu</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Katsu') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Rice Bowl</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Rice Bowl') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={6}>
                <p className='order_panel_title'>Sushi & Sashimi</p>
                <p className='order_panel_subtitle'>Sushi Sets</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Sushi Sets') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Sushi & Sashimi Sets</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Sushi & Sashimi Sets') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Special Seared Sushi</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Special Seared Sushi') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={7}>
                <p className='order_panel_title'>A La Carte</p>
                <p className='order_panel_subtitle'>Nigiri</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Nigiri') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
                <p className='order_panel_subtitle'>Sashimi</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.Sub_Category === 'Sashimi') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
              <TabPanel value={value} index={8}>
                <p className='order_panel_title'>Party Platter</p>
                <div className='order_cardHolder'>
                  {products.menu.map((menu, i) => {
                    if(menu.category === 'Party Platter') {
                      return (
                        <Card
                          sx={{ minWidth: 250, width: '400px',  marginBottom: '1em', marginRight: '1em', marginLeft: '1em'}}
                          key={i}
                        >
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span>
                            </Typography>
                            <Typography variant='body2'>
                              {menu.description}
                            </Typography>
                            <Typography variant='body1' componenet='div' sx={{ marginTop: '.75em', fontSize: '1.25em', color: 'darkgreen'}}>
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <div className='order_action'>
                            <CardActions>
                              <Button 
                                variant='contained' 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                value={menu._id}
                                onClick={modalOpener}
                              >
                                <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                              </Button>
                              {/* <Button 
                                size='small' 
                                sx={{marginBottom: '1em'}}
                                onClick={favButtonHandler}
                              >
                                <FavoriteIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Favorite
                              </Button> */}                       
                            </CardActions>
                          </div>
                        </Card>
                      )
                    }
                  })}
                </div>
              </TabPanel>
          </div>
        )
        }
      {/* TODO: add a modal trigger button here */}
      <Cart cart={cart} setCart={setCart} setCartOpened={setCartOpened} cartOpened={cartOpened}/>
      </div>
    </ThemeProvider>
  );
}
export default Order;