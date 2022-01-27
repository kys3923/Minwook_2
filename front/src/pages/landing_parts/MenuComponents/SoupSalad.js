import soupSaladData from '../../../Data/SoupSalad.json';

const soupSaladItems =
  soupSaladData.map((card) => {
    return (
      <div key={card.id} className='menuCard'>
        <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
        <p className='menuCard_description'>{card.description}</p>
        <p className='menuCard_price'>${card.Price}</p>
      </div>
    )
  })

const SoupSalad = (props) => {
  return (
    <div className='menuCardContainer'>
      <h2 className='menuCardTitle1'>Soup & Salad</h2>
      {soupSaladItems}
    </div>
  );
}
export default SoupSalad;