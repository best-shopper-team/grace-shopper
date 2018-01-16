import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ResetPassword from './resetPassword'

/**
 * COMPONENT
 */
export const UserHome = (props) => {

  return (
    <div>
      {props.user.passwordReset ?
        <ResetPassword />
        : <h3>Welcome, {props.user.name}!</h3>
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
