import sushiSetData from '../../../Data/SushiSashimi.json';

const sushiSetItems =
  sushiSetData.map((card) => {
    if (card.Sub_Category === 'Sushi Sets') {
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

const sushiSashimiSetItems =
  sushiSetData.map((card) => {
    if (card.Sub_Category === 'Sashimi $ Sashimi Sets') {
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

const searedSetItems =
  sushiSetData.map((card) => {
    if (card.Sub_Category === 'Special Seared Sushi') {
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

const SushiSashimi = (props) => {
  return (
    <div>
      <h2>Sushi Sets</h2>
      {sushiSetItems}
      <h2>Sushi & Sashimi Sets</h2>
      {sushiSashimiSetItems}
      <h2>Special Seared Sushi</h2>
      {searedSetItems}
    </div>
  );
}
export default SushiSashimi;