import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const EDIT_CART = 'EDIT_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const SUBMIT_CART = 'SUBMIT_CART'
const CREATE_CART_USER = 'CREATE_CART_USER'
const CREATE_CART_SESSION = 'CREATE_CART_SESSION'


/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const editCart = orderitem => ({type: EDIT_CART, orderitem})
const removeFromCart = orderitemId => ({type: REMOVE_FROM_CART, orderitemId})
const submitCart = cart => ({type: SUBMIT_CART, cart})
const createCartUser = cart => ({type: CREATE_CART_USER, cart})
const createCartSession = cart => ({type: CREATE_CART_SESSION, cart})

/**
 * THUNK CREATORS
 */
export const getCartFromDb = (userId) =>
  dispatch =>
    axios.get(`/api/orders/user/${userId}/cart`)
      .then(res => {
        if (res.data === null){
          dispatch(getCart(defaultCart))
        } else {
          dispatch(getCart(res.data))
        }
      })
      .catch(err => console.log(err))

export const getCartSessionFromDb = () =>
dispatch =>
  axios.get(`/api/orders/session/cart`)
    .then(res => {
      if (res.data === null){
        dispatch(getCart(defaultCart))
      } else {
        dispatch(getCart(res.data))
      }
    })
    .catch(err => console.log(err))

export const editCartItemsInDb = (orderItem) =>
  dispatch =>
    axios.put(`/api/orderItems/${orderItem.id}`, orderItem)
      .then(res => {
        dispatch(editCart(res.data[1]))
      })
      .catch(err => console.log(err))

export const removeCartFromDb = (orderitemId) =>
  dispatch =>
    axios.delete(`/api/orderItems/${orderitemId}`)
      .then(res => {
        dispatch(removeFromCart(orderitemId))
      })
      .catch(err => console.log(err))

export const submitCartToDb = (cart, address) =>
  dispatch => {
    let reqBody = {cart, address}
    axios.put(`/api/orders/cart/${cart.id}`, reqBody)
    .then(res => dispatch(submitCart(res.data)))
    .catch(err => console.log(err))
  }

export const createCartUserDb = (info) =>
  dispatch => {
    axios.post(`/api/orders/user`, info)
    .then(res => dispatch(createCartUser(res.data)))
    .catch(err => console.log(err))
  }

export const createCartSessionDb = (info) =>
  dispatch => {
    axios.post(`/api/orders/session`, info)
    .then(res => {
      dispatch(createCartSession(res.data))})
    .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case EDIT_CART:
      return {...state, orderitems: state.orderitems.map((orderitem) => {
        return orderitem.id === action.orderitem.id ? action.orderitem : orderitem
      })};
    case REMOVE_FROM_CART:
      return {...state, orderitems: state.orderitems.filter(orderitem => +orderitem.id !== +action.orderitemId)}
    case SUBMIT_CART:
      return {...state, status: action.cart.status, purchaseTime: action.cart.purchaseTime, addressId: action.cart.addressId}
    case CREATE_CART_USER:
      return action.cart;
    case CREATE_CART_SESSION:
      return action.cart;
    default:
      return state
  }
}
