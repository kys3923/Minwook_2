import rRolls from '../../../Data/RegularRolls.json'

const regularRollItems = 
  rRolls.map((card) => {

    if (card.Category ==='Regular Rolls') {
      return (
        <div key={card.id} className='menuCard'>
          <div className='menuCard_top'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
          </div>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const vegRollItems = 
  rRolls.map((card) => {

    if (card.Category ==='Vegetable Rolls') {
      return (
        <div key={card.id} className='menuCard'>
          <div className='menuCard_top'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
          </div>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const RegularRolls = (props) => {
  return (
    <div className='menuCardContainer'>
      <h2 className='menuCardTitle2'>Regular Rolls</h2>
      {regularRollItems}
      <h2 className='menuCardTitle2'>Vegetable Rolls</h2>
      {vegRollItems}
    </div>
  );
}
export default RegularRolls;