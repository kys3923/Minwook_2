import React, { useState, useEffect } from 'react';
import axios from 'axios';

// importing redux
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from '../redux/actions/productActions';


import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material'

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
        <Box sx={{ p: 3}}>
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
  const [ value, setValue ] = useState(0)
  
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts);
  const { products, loading, error } = getProducts;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  useEffect(() => {
    dispatch(listProducts());
  },[dispatch])

  console.log(products.menu, 'wtf')

  return (
    <div className="orderContainer">
      { loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : 
        <div className='order_left'>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
          >
            <Tabs
              orientation='vertical'
              variant='scrollable'
              value={value}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: 'divider', minWidth: '220px'}}
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
            <TabPanel value={value} index={0} sx={{ minWidth: '250px'}}>
              <p className='order_panel_title'>Special Rolls</p>
              {products.menu.map((menu, i) => {
                if(menu.category === 'Special Rolls') {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button onClick={(e) => {}} className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              } )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p className='order_panel_title'>Regular Rolls</p>
              {products.menu.map((menu, i) => {
                if(menu.category === "Regular Rolls") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_title2'>Vegetable Rolls</p>
              {products.menu.map((menu, i) => {
                if(menu.category === "Vegetable Rolls") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={2}>
              <p className='order_panel_title'>Lunch Special</p>
              <p className='order_panel_subtitle'>Bento Lunch</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Bento Lunch") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Sushi & Sashimi Lunch</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Bento Lunch") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <div className='menuCardLunchContainerOrder'>
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
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Lunch Roll Combo") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Udon Lunch</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Udon Lunch") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={3}>
              <p className='order_panel_title'>Appetizer</p>
              <p className='order_panel_subtitle'>Cold Appetizer</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Cold") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Hot Appetizer</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Hot") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={4}>
              <p className='order_panel_title'>Soup & Salad</p>
              {products.menu.map((menu, i) => {
                if(menu.category === "Soup & Salad") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={5}>
              <p className='order_panel_title'>Kitchen Entree</p>
              <p className='order_panel_subtitle'>Noodles</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Noodles") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Fried Rice</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Fried Rice") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Bento</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Bento") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Teriyaki</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Teriyaki") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Katsu</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Katsu") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Rice Bowl</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Rice Bowl") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={6}>
              <p className='order_panel_title'>Sushi & Sashimi</p>
              <p className='order_panel_subtitle'>Sushi Sets</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Sushi Sets") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Sushi & Sashimi Sets</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Sushi & Sashimi Sets") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Special Seared Sushi</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Special Seared Sushi") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={7}>
              <p className='order_panel_title'>A La Carte</p>
              <p className='order_panel_subtitle'>Nigiri</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Nigiri") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
              <p className='order_panel_subtitle'>Sashimi</p>
              {products.menu.map((menu, i) => {
                if(menu.Sub_Category === "Sashimi") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={8}>
              <p className='order_panel_title'>Party Platter</p>
              {products.menu.map((menu, i) => {
                if(menu.category === "Party Platter") {
                  return (
                    <div className='order_card'>
                      <div className='order_card_left'>
                        <p className='order_card_name'>{menu.name} <span className='order_card_caption'>{menu.caption}</span></p>
                        <p className='order_card_description'>{menu.description}</p>
                        <p className='order_card_price'>${menu.price}</p>
                      </div>
                      <div className='order_card_right'>
                        { menu.stock_availability ? 
                          <button className='order_card_button'>Add to Cart</button>
                        :
                          <p className='order_card_outstock'>Out of Stock</p>
                        }
                      </div>
                    </div>
                  )
                }
              })}
            </TabPanel>
          </Box>
        </div>
      }
      {/* <div className='order_right'>
        <p>right container</p>
      </div> */}
    </div>
  );
}
export default Order;