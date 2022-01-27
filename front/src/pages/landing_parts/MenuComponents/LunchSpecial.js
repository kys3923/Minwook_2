import lSpecial from '../../../Data/LunchSpecial.json';

const bentoItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Bento Lunch') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const sushiItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Sushi & Sashimi Lunch') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const rollCItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Lunch Roll Combo') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const udonItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Udon Lunch') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const LunchSpecial = (props) => {
  return (
    <div className='menuCardContainer'>
      <h1 className='menuCardTitle1'>Lunch Special<br /><span className='menuCardTitleSub'>available on 12pm - 3pm, served with miso soup</span></h1>
      <h2 className='menuCardTitle2'>Bento Lunch<br /><span className='menuCardTitleSub'>Served with soup, salad, gyoza & california roll</span></h2>
      {bentoItems}
      <h2 className='menuCardTitle2'>Sushi & Sashimi Lunch</h2>
      {sushiItems}
      <h3 className='menuCardTitle2'>Lunch Roll Combo</h3>
      {/* TODO: add roll selection here */}
      <div className='menuCardLunchContainer'>
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
      {rollCItems}
      <h3 className='menuCardTitle2'>Udon Lunch</h3>
      {udonItems}
    </div>
  );
}
export default LunchSpecial;