import axios from 'axios';
import { useState } from 'react';

// MUI components

import { TextField, Paper, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../../theme/theme';

const RegisterMenu = (props) => {

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

export default RegisterMenu;

