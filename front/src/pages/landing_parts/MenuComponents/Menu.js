import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import box from '@material-ui/core/Box';

import ALaCarte from './ALaCarte';
import Appetizer from './Appetizer';
import KitchenEntree from './KitchenEntree';
import LunchSpecial from './LunchSpecial';
import RegularRolls from './RegularRolls';
import SoupSalad from './SoupSalad';
import SpecialRolls from './SpecialRolls';
import SushiSashimi from './SushiSashimi';

const Menu = (props) => {

  const [menuSelected, setMenuSelected] = useState('sRolls')

  return (
    <nav className="Menu_Container">
      <ul>
        <li>Special Rolls</li>
        <li>Regular Rolls</li>
        <li>Lunch Special</li>
        <li>Appetizer</li>
        <li>Soup & Salad</li>
        <li>Kitchen Entree</li>
        <li>Sushi & Sashimi</li>
        <li>A La Carte</li>
      </ul>
      <div className='menuContents'>
        {/* content will be show here */}
        <SpecialRolls />
        <RegularRolls />
        <LunchSpecial />
        <Appetizer />
        <SoupSalad />
        <KitchenEntree />
        <SushiSashimi />
        <ALaCarte />
      </div>
    </nav>
  );
}
export default Menu;