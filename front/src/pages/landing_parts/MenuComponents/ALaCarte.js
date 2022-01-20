import carteData from '../../../Data/ALaCarte.json';

const carteItems =
  carteData.map((card) => {
    return (
      <div key={card.id} className='menuCard'>
        <h3>{card.name}</h3>
        <p>{card.sub_name}</p>
        <p>{card.description}</p>
        <p>${card.Price}</p>
      </div>
    )
  })

const ALaCarte = (props) => {
  return (
    <div>
      <h2>A La Carte</h2>
      {carteItems}
    </div>
  );
}
export default ALaCarte;