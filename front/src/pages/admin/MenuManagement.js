import axios from "axios";
import { useState, useEffect } from "react";
import EditMenu from './MenuMgmt/EditMenu';
import RegisterMenu from './MenuMgmt/RegisterMenu';


const MenuManagement = (props) => {

  const [ register, setRegister ] = useState(false);
  const [ receivedData, setReceivedData ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.authToken}`
        }
      }

      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);
      setReceivedData(request.data.menu);
      return request
    }
    fetchData();
  },[])

  console.log(receivedData, 'from menumgmt page')
  
  const buttonHandler = (e) => {
    setRegister(!register)
  }

  return (
    <div className="menumgmt_container">
      <ul className="menumgmt_headerlist">

        { register ? 
            <>
              <li onClick={buttonHandler} className="admin_buttons">Edit Menu</li>
              <li className="admin_buttons_selected">Register Menu</li> 
            </>
          :
            <>
              <li className="admin_buttons_selected">Edit Menu</li>
              <li onClick={buttonHandler} className="admin_buttons">Register Menu</li>
            </>
        }
        
      </ul>
      <div className="menumgmt_totalcontainer">
        <div className="menumgmt_leftcontainer">
          {register ? <RegisterMenu /> : <EditMenu receivedData={receivedData} />}
        </div>
        <div className="menumgmt_rightcontainer">

        </div>
      </div>
    </div>
  );
}
export default MenuManagement;