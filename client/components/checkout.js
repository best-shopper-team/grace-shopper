import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCartFromDb, submitCartToDb, getCartSessionFromDb} from '../store'

/**
 * COMPONENT
 */
export class Checkout extends Component{
  constructor(props){
    super(props)
    this.submitOrder = this.submitOrder.bind(this)
    this.state = {
      submitted: false
    }
  }

  componentDidMount(){
    if (this.props.user.id){
      this.props.getCart(this.props.user.id)
    } else {
      this.props.getCartSession()
    }
  }

  submitOrder(e){
    e.preventDefault()
    let newAddress = {
      street: e.target.street.value,
      city: e.target.city.value,
      state:  e.target.state.value,
      zip: e.target.zip.value,
      email: e.target.email.value
    }
    this.props.submitCart(this.props.cart, newAddress)
    this.setState({submitted: true})
  }

  render(){
    return (
      <div>
      {this.state.submitted ?
        <div>
          <h3>
            Your order has been submitted! Thank you for shopping with us ^_^
          </h3>
          <Link to="/products">
            Continue shopping...
          </Link>
        </div>
      :
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
                <label>Name</label>
                <input
                  type="text"
                  id="name">
                </input>
              </span>
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
        </div>}
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
    getCartSession: () => {
      dispatch(getCartSessionFromDb())
    },
    submitCart: (cart, address) => {
      dispatch(submitCartToDb(cart, address))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
