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
    console.log('e', e)
    // this.props.submitCart(this.props.cart.id)
  }

  render(){
    return (
      <div>
      <h4>
      Enter Your Shipping and Payment Information
      </h4>
      <form
        onSubmit={(e) => this.submitOrder(e)}>
        <input
          type="text"
          name="name">
        </input>
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
