import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getCartFromDb, me, editCartItemsInDb, removeCartFromDb, fetchProducts, getCartSessionFromDb} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
export class Cart extends Component{
  constructor(props){
    super(props)
    this.editOrder = this.editOrder.bind(this)
    this.removeButton = this.removeButton.bind(this)
  }

  componentDidMount(){
    if (!this.props.allProducts.length){
      this.props.getProducts()
    }
    //if there is no, we should getCart by sessionId (and we may need to change getCart reducer? and or its api? or create its own)
    if (!this.props.user.id){
      this.props.getCartSession()
    } else {
      this.props.getCart(this.props.user.id)
    }
  }

  editOrder(e){
    e.preventDefault()
    let changeObj = {
      id: +e.target.name,
      quantity: +e.target.value
    }
    this.props.editCart(changeObj)
  }

  removeButton(e){
    this.props.removeFromCart(e.target.name)
  }

  render(){
    const cart = this.props.cart
    const products = this.props.allProducts
    return (
      <div className="cartContainer">
        <h3>This is your cart</h3>
        { cart.orderitems && cart.orderitems.map((orderItem) => {
          return (
            <div key={orderItem.id} className="orderItem">
            <h4>{
              (products.length > 0 && products.find((prod) => prod.id === orderItem.productId)).title
            }</h4>
              <div className="item-info">
                <span>
                  {products.length > 0 &&
                  <img
                  className="product-image"
                  src={products.filter((product) => {
                    return product.id === orderItem.productId
                  })[0].photoUrl} />}
                </span>
                <span>ProductId:
                  {orderItem.id}
                </span>
                <span>Price:
                  {parseFloat(orderItem.itemPrice * 0.01).toFixed(2)}
                </span>
                {products.length > 0 &&
                <span>Quantity:
                  <input
                  name={orderItem.id}
                  min="0"
                  type="number"
                  onChange={(e) => {
                    this.editOrder(e)}}
                  defaultValue={orderItem.quantity}
                  max={products.length > 0 && products.filter((product) => {
                    return product.id === orderItem.productId
                  })[0].quantity} />
                </span>}
                <span>Item Total:
                  ${parseFloat(orderItem.itemTotal * 0.01).toFixed(2)}
                </span>
                <span>
                    <button
                    name={orderItem.id}
                    onClick={(e) => this.removeButton(e)}>
                    Remove Item from Cart
                    </button>
                </span>
              </div>
            </div>
          )
        })}
        {
          cart.orderitems &&
            cart.orderitems.length > 0 ?
              <h4>Subtotal: ${
              parseFloat(
                (cart.orderitems.map(orderitem => orderitem.itemTotal).reduce((accum, currentVal) => accum + currentVal))
                * 0.01)
                .toFixed(2)
              }
              </h4>
            : <h3>Your cart is empty</h3>
        }
        <NavLink to="/cart/checkout">
          <button
          className="ui button">
          Proceed to Checkout
          </button>
        </NavLink>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    allProducts: state.allProducts
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: function(id){
      dispatch(getCartFromDb(id))
    },
    getCartSession: function(){
      dispatch(getCartSessionFromDb())
    },
    getProducts: function(){
      dispatch(fetchProducts())
    },
    getMe: function(){
      dispatch(me())
    },
    editCart: function(orderItem){
      dispatch(editCartItemsInDb(orderItem))
    },
    removeFromCart: function(orderitemId){
      dispatch(removeCartFromDb(orderitemId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
