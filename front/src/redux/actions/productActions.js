import * as actionTypes from '../constants/productConstants';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST});

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message ? error.data.message : error.message,
    });
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST});

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.data.message : error.message,
    });
  }
}

export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRODUCT_DETAILS_RESET
  })
}