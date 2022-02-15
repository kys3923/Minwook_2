import { Link } from 'react-router-dom';


const IntroAndOrder = (props) => {

  return (
    <div className="IntroAndOrder_Container">
      <div className="IO_TextBox">
        <h4>Authentic <br /> Japanese Cuisine</h4>
        <p>Freshness Served Daily.</p>
        <div className="IO_ButtonBox">
          <Link to='/Order' className='IO_buttons'>Order Take Out</Link>
          <Link to='/Reservation' className='IO_buttons'>Make Reservation</Link>
          {/* <button className="IO_buttons">Order Take Out</button>
          <button className="IO_buttons">Make Reservation</button> */}
        </div>
      </div>
    </div>
  );
}
export default IntroAndOrder;