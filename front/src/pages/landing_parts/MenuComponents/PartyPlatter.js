import PartyPlatter from '../../../Data/PartyPlatter.json';

const PartyPlatterMenu =
  PartyPlatter.map((card) => {
    let DoubleMap = card.description.map((items, i) => {
      return (
        <p key={i} className='menuCard_description_list'>{items}</p>
      )
    })
    return (
      <div key={card.id} className='menuCard_listitems'>
        <h3 className='menuCard_name'>{card.name}</h3>
        {DoubleMap}
        <p className='menuCard_pricelist'>${card.Price}</p>
      </div>
    )
  })

const PartyPlatterItems = (props) => {
  return (
    <div className='menuCardContainer'>
      <h2 className='menuCardTitle1'>Party Platters</h2>
      {PartyPlatterMenu}
    </div>
  );
}
export default PartyPlatterItems;