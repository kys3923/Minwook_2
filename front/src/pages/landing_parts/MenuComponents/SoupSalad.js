import soupSaladData from '../../../Data/SoupSalad.json';

const soupSaladItems =
  soupSaladData.map((card) => {
    return (
      <div key={card.id} className='menuCard'>
        <h3>{card.name}</h3>
        <p>{card.sub_name}</p>
        <p>{card.description}</p>
        <p>${card.Price}</p>
      </div>
    )
  })

const SoupSalad = (props) => {
  return (
    <div>
      <h2>Soup & Salad</h2>
      {soupSaladItems}
    </div>
  );
}
export default SoupSalad;