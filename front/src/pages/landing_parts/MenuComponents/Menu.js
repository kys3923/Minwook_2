import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css'

import ALaCarte from './ALaCarte';
import Appetizer from './Appetizer';
import KitchenEntree from './KitchenEntree';
import LunchSpecial from './LunchSpecial';
import RegularRolls from './RegularRolls';
import SoupSalad from './SoupSalad';
import SpecialRolls from './SpecialRolls';
import SushiSashimi from './SushiSashimi';
import PartyPlatterItems from './PartyPlatter';
import axios from 'axios';

const Menu = (props) => {

  const [fetchedData, SetFetchedData ] = useState([])
  // const [fetchedData, SetFetchedData ] = useState([])
  // const [fetchedData, SetFetchedData ] = useState([])

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);
      SetFetchedData(request.data.menu);
      return request
    }
    fetchData();
  },[])

  console.log(fetchedData, 'from app page')

  return (
    <nav className="Menu_Container">
      <div className='logosContainer'>
        <ul className='logosList'>
          <li className='logoListTitle'>Order a delivery</li>
          <li><a target="_blank" href='https://www.ubereats.com/store/sushi-ville/mKWTjH-SVjSSGVSNwK3KMw?utm_source=google&utm_medium=organic&utm_campaign=place-action-link'><img className='deliveryLogos' src='/images/uberEatsLogo.png' /></a></li>
          <li><a target="_blank" href='https://www.doordash.com/store/sushiville-sloatsburg-2571701/?utm_campaign=gpa'><img className='deliveryLogos' src='/images/doorDashLogo.png' /></a></li>
          <li><a target="_blank" href='https://www.grubhub.com/restaurant/sushiville-67-orange-turnpike-sloatsburg/3061762?utm_source=google&utm_medium=organic&utm_campaign=place-action-link'><img className='deliveryLogos' src='/images/grubHubLogo.png' /></a></li>
        </ul>
      </div>
      <div className='Tab_Container'>
        <h1 className='tab_Title' >MENU</h1>
        <Tabs>
          <TabList>
            <Tab>Special Rolls</Tab>
            <Tab>Regular Rolls</Tab>
            <Tab>Lunch Special</Tab>
            <Tab>Appetizer</Tab>
            <Tab>Soup & Salad</Tab>
            <Tab>Kitchen Entree</Tab>
            <Tab>Sushi & Sashimi</Tab>
            <Tab>A La Carte</Tab>
            <Tab>Party Platter</Tab>
          </TabList>
          <TabPanel>
            <div className='panelContainer'>
              <SpecialRolls fetchedData={fetchedData}/>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <RegularRolls fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <LunchSpecial fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <Appetizer fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <SoupSalad fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <KitchenEntree fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <SushiSashimi fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <ALaCarte fetchedData={fetchedData} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <PartyPlatterItems fetchedData={fetchedData} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </nav>
  );
}
export default Menu;