import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartFromDb, submitCartToDb} from '../store'

/**
 * COMPONENT
 */
export class Checkout extends Component{
  constructor(props){
    super(props)
    this.submitOrder = this.submitOrder.bind(this)
  }

  componentDidMount(){
    this.props.getCart(this.props.user.id)
  }

  submitOrder(e){
    e.preventDefault()
    console.log('e', e.target.street.value)
    // this.props.submitCart(this.props.cart.id)
  }

  render(){
    return (
      <div>
      <h3>
      Enter Your Shipping and Payment Information
      </h3>
      <form
        onSubmit={(e) => this.submitOrder(e)}>
        <h5>Shipping Information
        </h5>
        <div>
          <span>
            <label>Street</label>
            <input
              type="text"
              id="street">
            </input>
          </span>
          <span>
            <label>City</label>
            <input
              type="text"
              id="city">
            </input>
          </span>
          <span>
            <label>State</label>
            <input
              type="text"
              id="state">
            </input>
          </span>
          <span>
            <label>Zip Code</label>
            <input
              type="text"
              id="zip">
            </input>
          </span>
          <span>
            <label>Email</label>
            <input
              type="text"
              id="email">
            </input>
          </span>
        </div>
        <h5>Payment Information
        </h5>
        <div>
          <span>
            <label>Credit Card Number</label>
            <input
              type="text"
              id="ccnum">
            </input>
          </span>
          <span>
            <label>Expiration Date</label>
            <input
              type="text"
              id="expiry">
            </input>
          </span>
          <span>
          <label>CCV</label>
          <input
            type="text"
            id="ccv">
          </input>
          </span>
        </div>
        <br />
        <button
          type="submit">
          Submit Order
        </button>
      </form>
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
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => {
      dispatch(getCartFromDb(id))
    },
    submitCart: (id) => {
      dispatch(submitCartToDb(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
