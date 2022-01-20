import lSpecial from '../../../Data/LunchSpecial.json';

const bentoItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Bento Lunch') {
      return (
        <div key={card.id} className='menuCard'>
          <h3>{card.name}</h3>
          <p>{card.sub_name}</p>
          <p>{card.description}</p>
          <p>${card.Price}</p>
        </div>
      )
    }
  })

const sushiItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Sushi & Sashimi Lunch') {
      return (
        <div key={card.id} className='menuCard'>
          <h3>{card.name}</h3>
          <p>{card.sub_name}</p>
          <p>{card.description}</p>
          <p>${card.Price}</p>
        </div>
      )
    }
  })

const rollCItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Lunch Roll Combo') {
      return (
        <div key={card.id} className='menuCard'>
          <h3>{card.name}</h3>
          <p>{card.sub_name}</p>
          <p>{card.description}</p>
          <p>${card.Price}</p>
        </div>
      )
    }
  })

const udonItems = 
  lSpecial.map((card) => {

    if (card.Sub_Category ==='Udon Lunch') {
      return (
        <div key={card.id} className='menuCard'>
          <h3>{card.name}</h3>
          <p>{card.sub_name}</p>
          <p>{card.description}</p>
          <p>${card.Price}</p>
        </div>
      )
    }
  })

const LunchSpecial = (props) => {
  return (
    <div>
      <h2>Bento Lunch</h2>
      {bentoItems}
      <h2>Sushi & Sashimi Lunch</h2>
      {sushiItems}
      <h3>Lunch Roll Combo</h3>
      {/* TODO: add roll selection here */}
      {rollCItems}
      <h3>Udon Lunch</h3>
      {udonItems}
    </div>
  );
}
export default LunchSpecial;