import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const EDIT_CART = 'EDIT_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

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

/**
 * THUNK CREATORS
 */
export const getCartFromDb = (userId) =>
  dispatch =>
    axios.get(`api/orders/user/${userId}/cart`)
      .then(res => {
        dispatch(getCart(res.data || defaultCart))
      })
      .catch(err => console.log(err))

export const editCartItemsInDb = (orderItem) =>
  dispatch =>
    axios.put(`api/orderItems/${orderItem.id}`, orderItem)
      .then(res => {
        dispatch(editCart(res.data[1]))
      })
      .catch(err => console.log(err))

export const removeCartFromDb = (orderitemId) =>
  dispatch =>
    axios.delete(`api/orderItems/${orderitemId}`)
      .then(res => {
        dispatch(removeFromCart(orderitemId))
      })
      .catch(err => console.log(err))

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
    default:
      return state
  }
}

/*
earlier way of reducing edit_cart
      // state.orderitems = state.orderitems.map((orderitem) => {
      //   return orderitem.id === action.orderitem.id ? action.orderitem : orderitem
      // })
      // return state
*/
