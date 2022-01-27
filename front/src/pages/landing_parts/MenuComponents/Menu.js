import React, { useState } from 'react';
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

const Menu = (props) => {


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
        <h1>MENU</h1>
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
              <SpecialRolls />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <RegularRolls />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <LunchSpecial />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <Appetizer />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <SoupSalad />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <KitchenEntree />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <SushiSashimi />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <ALaCarte />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panelContainer'>
              <PartyPlatterItems />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </nav>
  );
}
export default Menu;