import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Account = (props) => {

  const [ id, setId ] = useState('');
  const [ userData, setUserData ] = useState(null);
  
  // useEffect(()=> {
  //   setId(localStorage.userId);
  // }, [])

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/${localStorage.userId}`, config);
      setUserData(request.data.user)
      return request
    }
    fetchData();
  }, [])

  // Reservation History


  // Order History

  // Log Out

  // edit user ( username, contact, password, address1, email )

  // delete user ( id )

  // if admin, delete usr from all list
  // if admin, update an user to admin
  
  return (
    <div className="loginContainer">
      { !userData ? 
        <div className="error_account">
          <h3>Loading...</h3>
          <button> Click to reload </button>
        </div>
      :
        <div className="accountContainer">
          <h1>Welcome! {userData.username}</h1>
          <p>Order History</p>
          <ul>
            { userData.Orders.map((order, i) => {
              return <li key={i}>{order.updatedAt}, total price <button>click to view detail</button></li>
            })}
          </ul>
          <p>personal info</p>
            <ul>
              <li>Name: {userData.username}</li>
              <li>Contact Number: {userData.contact}</li>
              <li>Contact email: {userData.email}</li>
            </ul>
            <button>update personal information</button>
          <p>Reservation History</p>
          <ul>
            { userData.Reservations.map((reserve, i) => {
              return <li key={i}>{reserve.reserveDate}, totalParty, </li>
            })}
          </ul>
        </div>
      }
      {userData ? console.log(userData) : <p>userData not found</p>}
      <Outlet />
    </div>  
  );
}
export default Account;