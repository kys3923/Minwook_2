import rRolls from '../../../Data/RegularRolls.json'

const regularRollItems = 
  rRolls.map((card) => {

    if (card.Category ==='Regular Rolls') {
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

const vegRollItems = 
  rRolls.map((card) => {

    if (card.Category ==='Vegetable Rolls') {
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

const RegularRolls = (props) => {
  return (
    <div>
      <h2>Regular Rolls</h2>
      {regularRollItems}
      <h2>Vegetable Rolls</h2>
      {vegRollItems}
    </div>
  );
}
export default RegularRolls;