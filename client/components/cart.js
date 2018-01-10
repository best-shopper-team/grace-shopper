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
  }

  componentDidMount(){
    this.props.getCart(this.props.user.id)
    // if(!this.props.user.id){

    // }
  }

  render(){
    const cart = this.props.cart
    return (
      <div className="cartContainer">
        <h3>This is your cart</h3>
        { cart.orderitems && cart.orderitems.map((orderItem) => {
          return (
            <div key={orderItem.id}>
              This is an orderitem {orderItem.id}
            </div>
          )
        })}
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
    getCart: function(id){
      dispatch(getCartFromDb(id))
    },
    getMe: function(){
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
