import sushiSetData from '../../../Data/SushiSashimi.json';

const sushiSetItems =
  sushiSetData.map((card) => {
    if (card.Sub_Category === 'Sushi Sets') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const sushiSashimiSetItems =
  sushiSetData.map((card) => {
    if (card.Sub_Category === 'Sashimi $ Sashimi Sets') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const searedSetItems =
  sushiSetData.map((card) => {
    if (card.Sub_Category === 'Special Seared Sushi') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const SushiSashimi = (props) => {
  return (
    <div className='menuCardContainer'>
      <h1 className='menuCardTitle1'>Sushi & Sashimi</h1>
      <h2 className='menuCardTitle2'>Sushi Sets</h2>
      {sushiSetItems}
      <h2 className='menuCardTitle2'>Sushi & Sashimi Sets</h2>
      {sushiSashimiSetItems}
      <h2 className='menuCardTitle2'>Special Seared Sushi</h2>
      {searedSetItems}
    </div>
  );
}
export default SushiSashimi;