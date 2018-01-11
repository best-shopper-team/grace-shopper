import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartFromDb, me} from '../store'

/**
 * COMPONENT
 */
export class Cart extends Component{
  constructor(props){
    super(props)
    this.proceedCheckout = this.proceedCheckout.bind(this)
  }

  componentDidMount(){
    this.props.getCart(this.props.user.id)
  }

  proceedCheckout(e){
    console.log('event', e)
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
                  {orderItem.quantity}
                </span>
                <span>Item Total:
                  {parseFloat(orderItem.itemTotal * 0.01).toFixed(2)}
                </span>
              </div>
            </div>
          )
        })}
        <h4>Subtotal: {
          cart.orderitems &&
            parseFloat(
              (cart.orderitems.map(orderitem => orderitem.itemTotal).reduce((accum, currentVal) => accum + currentVal))
              * 0.01)
              .toFixed(2)
        }
        </h4>
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
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
