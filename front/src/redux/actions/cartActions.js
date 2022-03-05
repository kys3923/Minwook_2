import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      caption: data.caption,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      Sub_Category: data.Sub_Category,
      stock_availability: data.stock_availability,
      qty
    }
  })

  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id
  })

  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
};