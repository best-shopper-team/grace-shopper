import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartFromDb, me, editCartItemsInDb} from '../store'

/**
 * COMPONENT
 */
export class Cart extends Component{
  constructor(props){
    super(props)
    this.proceedCheckout = this.proceedCheckout.bind(this)
    this.editOrder = this.editOrder.bind(this)
  }

  componentDidMount(){
    this.props.getCart(this.props.user.id)
  }

  editOrder(e){
    e.preventDefault()
    let changeObj = {
      id: +e.target.name,
      quantity: +e.target.value
    }
    this.props.editCart(changeObj)
    // this.props.getCart(this.props.user.id)
  }

  proceedCheckout(e){
    console.log('proceed to checkout', e.target)
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
              (products.find((prod) => prod.id === orderItem.productId)).title
            }</h4>
              <div className="item-info">
                <span>ProductId:
                  {orderItem.id}
                </span>
                <span>Price:
                  {parseFloat(orderItem.itemPrice * 0.01).toFixed(2)}
                </span>
                <span>Quantity:
                  <input
                  name={orderItem.id}
                  min="0"
                  type="number"
                  onChange={(e) => {
                    this.editOrder(e)}}
                  defaultValue={orderItem.quantity} />
                </span>
                <span>Item Total:
                  {parseFloat(orderItem.itemTotal * 0.01).toFixed(2)}
                </span>
              </div>
            </div>
          )
        })}
        {
          cart.orderitems &&
            cart.orderitems.length > 0 ?
              <h4>Subtotal: {
              parseFloat(
                (cart.orderitems.map(orderitem => orderitem.itemTotal).reduce((accum, currentVal) => accum + currentVal))
                * 0.01)
                .toFixed(2)
              }
              </h4>
            : <h3>Your cart is empty</h3>
        }
        <button onClick={e => this.proceedCheckout(e)} className="ui button">
        Proceed to Checkout
        </button>
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
    getMe: function(){
      dispatch(me())
    },
    editCart: function(orderItem){
      dispatch(editCartItemsInDb(orderItem))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
