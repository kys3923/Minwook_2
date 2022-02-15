import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


const EditMenu = (props) => {
  // menu model : name, description, price, category, Sub_Category, stock_availability
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ Sub_Category, setSubCategory] = useState('');
  const [ stock_availability, setStock ] = useState(null);
  const [ error, setError ] = useState('loading');
  const [ receivedData, setReceivedData ] = useState([]);
  const [ id, setId ] = useState('');
  const [ isLoaded, setIsLoaded ] = useState(false);
  
  // ------------------------------------- receiving all menu from api
  useEffect(() => {
    if (props.receivedData.length > 0) {
      setIsLoaded(true);
      setReceivedData(props.receivedData);
    }
  },[props.receivedData])
  
  // ------------------------------------ menu boxes

  let allMenuBoxes =
  isLoaded ?
    receivedData.map((menu, i) => {
      return (
        <div key={i} className="admin_menubox">
          <ul className="admin_menubox_ul">
            <li className="admin_menubox_name">{menu.name}</li>
            <li className="admin_menubox_description">{menu.description}</li>
            <li className="admin_menubox_id">{menu.id}</li>
            <li className="admin_menubox_caption">{menu.caption}</li>
            <li className="admin_menubox_price">{menu.price}</li>
            <li className="admin_menubox_category">{menu.category}</li>
            <li className="admin_menubox_Sub_Category">{menu.Sub_Category}</li>
            <li className="admin_menubox_stock_availability">{menu.stock_availability}</li>
          </ul>
        </div>
      )
    })
  :
    <div>
      <p>Loading...</p>
    </div>

  // MUI grid components

  const columns = [
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'caption', headerName: 'Caption', editable: true },
    { field: 'description', headerName: 'Description', editable: true },
    { field: 'category', headerName: 'Category', editable: true },
    { field: 'Sub_Category', headerName: 'Sub Category', editable: true },
    { field: 'stock_availability', headerName: 'Stock', editable: true },
  ]

  return (
    <div className="view_admin_container">
      {allMenuBoxes}
      <DataGrid columns={columns} />
    </div>
  )
}



// -------------------------- EDIT MENU = POPUP WINDOW ---------------------//

export default EditMenu;