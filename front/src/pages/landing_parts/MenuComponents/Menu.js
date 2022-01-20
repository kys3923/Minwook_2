import React, { useState } from 'react';

import ALaCarte from './ALaCarte';
import Appetizer from './Appetizer';
import KitchenEntree from './KitchenEntree';
import LunchSpecial from './LunchSpecial';
import RegularRolls from './RegularRolls';
import SoupSalad from './SoupSalad';
import SpecialRolls from './SpecialRolls';
import SushiSashimi from './SushiSashimi';

const Menu = (props) => {

  const [menuSelected, setMenuSelected] = useState(<SpecialRolls />)

  // Handlers

  const sRollHandler = () => {
    setMenuSelected(<SpecialRolls />)
  }

  const rRollHandler = () => {
    setMenuSelected(<RegularRolls />)
  }

  const lSpecialHandler = () => {
    setMenuSelected(<LunchSpecial />)
  }

  const appetizerHandler = () => {
    setMenuSelected(<Appetizer />)
  }

  const soupSaladHandler = () => {
    setMenuSelected(<SoupSalad />)
  }

  const kitchenEntreeHandler = () => {
    setMenuSelected(<KitchenEntree />)
  }

  const sSashimiHandler = () => {
    setMenuSelected(<SushiSashimi />)
  }

  const aLaCarteHandler = () => {
    setMenuSelected(<ALaCarte />)
  }

  return (
    <nav className="Menu_Container">
      <ul>
        <li onClick={sRollHandler}>Special Rolls</li>
        <li onClick={rRollHandler}>Regular Rolls</li>
        <li onClick={lSpecialHandler}>Lunch Special</li>
        <li onClick={appetizerHandler}>Appetizer</li>
        <li onClick={soupSaladHandler}>Soup & Salad</li>
        <li onClick={kitchenEntreeHandler}>Kitchen Entree</li>
        <li onClick={sSashimiHandler}>Sushi & Sashimi</li>
        <li onClick={aLaCarteHandler}>A La Carte</li>
      </ul>
      <div className='menuContents'>
        {/* content will be show here */}
        {menuSelected}
        {/* <SpecialRolls />
        <RegularRolls />
        <LunchSpecial />
        <Appetizer />
        <SoupSalad />
        <KitchenEntree />
        <SushiSashimi />
        <ALaCarte /> */}
      </div>
    </nav>
  );
}
export default Menu;