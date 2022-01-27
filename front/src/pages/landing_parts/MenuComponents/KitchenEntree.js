import kMenuData from '../../../Data/KitchenEntree.json';

const noodleItems =
  kMenuData.map((card) => {
    if (card.Category ==='Noodles') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const fRiceItems =
  kMenuData.map((card) => {
    if (card.Category === 'Fried Rice') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const bentoItems =
  kMenuData.map((card) => {
    if (card.Category === 'Bento') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const teriItems =
  kMenuData.map((card) => {
    if (card.Category === 'Teriyaki') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const katsuItems =
  kMenuData.map((card) => {
    if (card.Category === 'Katsu') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const bowlItems =
  kMenuData.map((card) => {
    if (card.Category === 'Rice Bowl') {
      return (
        <div key={card.id} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.sub_name}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.Price}</p>
        </div>
      )
    }
  })

const KitchenEntree = (props) => {
  return (
    <div className='menuCardContainer'>
      <h1 className='menuCardTitle1'>Kitchen Entree</h1>
      <h2 className='menuCardTitle2'>Noodles</h2>
      {noodleItems}
      <h2 className='menuCardTitle2'>Fried Rice<br /><span className='menuCardTitleSub'>Served with miso soup</span></h2>
      {fRiceItems}
      <h2 className='menuCardTitle2'>Bento<br /><span className='menuCardTitleSub'>Served with soup, salad, mixed tempura, california roll</span></h2>
      {bentoItems}
      <h2 className='menuCardTitle2'>Teriyaki<br /><span className='menuCardTitleSub'>Served with soup, salad, vegetable & rice</span></h2>
      {teriItems}
      <h2 className='menuCardTitle2'>Katsu<br /><span className='menuCardTitleSub'>Served with soup, salad, vegetable & rice</span></h2>
      {katsuItems}
      <h2 className='menuCardTitle2'>Rice Bowl</h2>
      {bowlItems}
    </div>
  );
}
export default KitchenEntree;