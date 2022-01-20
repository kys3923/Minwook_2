import kMenuData from '../../../Data/KitchenEntree.json';
console.log(kMenuData)
const noodleItems =
  kMenuData.map((card) => {
    if (card.Category ==='Noodles') {
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

const fRiceItems =
  kMenuData.map((card) => {
    if (card.Category === 'Fried Rice') {
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

const bentoItems =
  kMenuData.map((card) => {
    if (card.Category === 'Bento') {
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

const teriItems =
  kMenuData.map((card) => {
    if (card.Category === 'Teriyaki') {
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

const katsuItems =
  kMenuData.map((card) => {
    if (card.Category === 'Katsu') {
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

const bowlItems =
  kMenuData.map((card) => {
    if (card.Category === 'Katsu') {
      return (
        <div key={card.id} className='Rice Bowl'>
          <h3>{card.name}</h3>
          <p>{card.sub_name}</p>
          <p>{card.description}</p>
          <p>${card.Price}</p>
        </div>
      )
    }
  })

const KitchenEntree = (props) => {
  return (
    <div>
      <h2>Noodles</h2>
      {noodleItems}
      <h2>Fried Rice</h2>
      {fRiceItems}
      <h2>Bento</h2>
      {bentoItems}
      <h2>Teriyaki</h2>
      {teriItems}
      <h2>Katsu</h2>
      {katsuItems}
      <h2>Rice Bowl</h2>
      {bowlItems}
    </div>
  );
}
export default KitchenEntree;