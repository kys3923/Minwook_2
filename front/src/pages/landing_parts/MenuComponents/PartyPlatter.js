import PartyPlatter from '../../../Data/PartyPlatter.json';

const PartyPlatterMenu =
  PartyPlatter.map((card) => {
    let DoubleMap = card.description.map((items) => {
      return (
        <p>{items}</p>
      )
    })
    return (
      <div key={card.id} className='menuCard'>
        <h3>{card.name}</h3>
        <p>{card.sub_name}</p>
        {DoubleMap}
        <p>${card.Price}</p>
      </div>
    )
  })

const PartyPlatterItems = (props) => {
  return (
    <div>
      <h2>Party Platters</h2>
      {PartyPlatterMenu}
    </div>
  );
}
export default PartyPlatterItems;