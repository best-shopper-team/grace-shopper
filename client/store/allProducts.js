import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * INITIAL STATE
 */
const allProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export function fetchProducts() {
  return function thunk(dispatch) {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = getProducts(products);
        dispatch(action);
      });
  }
}

export function postProduct(product) {
  return function thunk(dispatch) {
    return axios.post('/api/products/', product)
      .then(res => res.data)
      .then(newProduct => dispatch(addProduct(newProduct)))
      // .then(createdProduct => history.push(`/products/${createdProduct.id}`))
      // // REVISIT THIS ^
      .catch(err => console.log(err))
  }
}

export const editProduct = product =>
  dispatch => {
    return axios.put(`/api/products/${product.id}`, product)
      .then(res => {
        return dispatch(updateProduct(res.data))
      })
    }

/**
 * REDUCER
 */
export default function (state = allProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case UPDATE_PRODUCT:
      let newState = [...state];
      let productIndex = state.findIndex(product => product.id === action.product.id);
      newState[productIndex] = action.product;
      return newState;
    default:
      return state
  }
}
