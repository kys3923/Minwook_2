import axios from "axios";
import { useState, useEffect } from "react";

const EditMenu = (props) => {
  // menu model : name, description, price, category, Sub_Category, stock_availability
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ Sub_Category, setSubCategory] = useState('');
  const [ stock_availability, setStock ] = useState(null);
  const [ error, setError ] = useState('');
  const [ receivedData, setReceivedData ] = useState([]);
  const [ id, setId ] = useState('');


// ------------------------------------- receiving all menu from api

const receivingAllMenu = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.authToken}`
      }
    }
    
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config)
      
      setReceivedData(data);
      
    } catch (error) {
      setError('An Error in receiving data')
    }
  }
  
  useEffect(() => {
    receivingAllMenu();
  }, [])
  
  console.log(receivedData.menu, 'after async function');
// ------------------------------------ menu boxes

const allMenuBoxes = 
  receivedData.menu.length == 0 ?
  <>
    <div><p>There is not any menu item registered.</p></div>
  </>
  :
  receivedData.menu.map((menu, i) => {
    let name = `${menu.name}`
    let description = `${menu.description}`
    let id = `${menu._id}`
    let caption = `${menu.caption}`
    let price = `${menu.price}`
    let category = `${menu.category}`
    let Sub_Category = `${menu.Sub_Category}`
    let stock_availability = `${menu.stock_availability}`
    
    return (
      <div key={i} className="admin_menubox">
        <ul className="admin_menubox_ul">
          <li className="admin_menubox_name">{name}</li>
          <li className="admin_menubox_description">{description}</li>
          <li className="admin_menubox_id">{id}</li>
          <li className="admin_menubox_caption">{caption}</li>
          <li className="admin_menubox_price">{price}</li>
          <li className="admin_menubox_category">{category}</li>
          <li className="admin_menubox_Sub_Category">{Sub_Category}</li>
          <li className="admin_menubox_stock_availability">{stock_availability}</li>
        </ul>
      </div>
    )
  })


  return (
    <div className="view_admin_container">
      <h1>this is view section</h1>
      {allMenuBoxes}
    </div>
  )
}

const RegisterwMenu = (props) => {

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ Sub_Category, setSubCategory] = useState('');
  const [ stock_availability, setStock ] = useState(true);
  const [ error, setError ] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.authToken}`
      }
    }
  
  
    try {
      console.log('trying to submit the request')
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/menu`,
        { name, description, price, category, caption, Sub_Category, stock_availability },
        config
      );
      setError(`Registered ${name}`);
      setTimeout(()=>{
        setError('');
      }, 5000)
      resettingStates();
    } catch (error) {
      setError('An Error occured during register the menu item');
      setTimeout(()=>{
        setError('');
      },10000)
    }
  }

  const resettingStates = () => {
    setName('');
    setDescription('');
    setCaption('');
    setPrice(0);
    setCategory('');
    setSubCategory('');
    console.log('reset state complete')
  }


  return (
    <div className="Register_admin_Container">
      <form onSubmit={registerHandler} className='register_admin_form'>
        <h3 className="register_title">Register Menu</h3>
        { error && <span className="error_message">{error}</span> }
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type='text'
            required
            id='name'
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="caption">Caption:</label>
          <input
            type='text'
            required
            id='caption'
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type='text'
            required
            id='description'
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price: <span className="form_caption">(delete 0 for input)</span></label>
          <input
            type='number'
            required
            id='price'
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type='text'
            required
            id='category'
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Sub_Category">Sub Category:</label>
          <input
            type='text'
            required
            id='Sub_Category'
            placeholder="Enter sub category"
            value={Sub_Category}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </div>

        <button type="submit" className="form_button_primary">Register</button>

      </form>
    </div>
  )
}


const MenuManagement = (props) => {

  // menu model : name, description, price, category, Sub_Category, stock_availability
  // const [ name, setName ] = useState('');
  // const [ description, setDescription ] = useState('');
  // const [ price, setPrice ] = useState(Number);
  // const [ category, setCategory ] = useState('');
  // const [ Sub_Category, setSubCategory] = useState('');
  // const [ stock_availability, setStock ] = useState(false);
  // const [ error, setError ] = useState('');
  const [ register, setRegister ] = useState(false);

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
          {register ? <RegisterwMenu /> : <EditMenu />}
        </div>
        <div className="menumgmt_rightcontainer">

        </div>
      </div>
    </div>
  );
}
export default MenuManagement;