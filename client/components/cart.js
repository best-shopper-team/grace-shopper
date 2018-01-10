import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Cart = (props) => {
  const {email} = props

  return (
    <div>
      <h3>This is your cart</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Cart)

/**
 * PROP TYPES
 */
Cart.propTypes = {
  email: PropTypes.string
}
