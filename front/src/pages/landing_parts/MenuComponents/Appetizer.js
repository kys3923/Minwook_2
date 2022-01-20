import appetData from '../../../Data/Appetizer.json'

const coldItems = 
  appetData.map((card) => {

    if (card.Sub_Category ==='Cold') {
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

const hotItems = 
  appetData.map((card) => {

    if (card.Sub_Category ==='Hot') {
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

const Appetizer = (props) => {
  return (
    <div>
      <h2>Cold Appetizer</h2>
      {coldItems}
      <h2>Hot Appetizer</h2>
      {hotItems}
    </div>
  );
}
export default Appetizer;