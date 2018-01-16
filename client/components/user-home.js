import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ResetPassword from './resetPassword'
import InactiveUser from './InactiveUser'

/**
 * COMPONENT
 */
export const UserHome = (props) => {

  let toRender;

  if (!props.user.isActive)toRender = <InactiveUser />
  else if (props.user.passwordReset) toRender = <ResetPassword />
  else toRender = <h3>Welcome, {props.user.name}!</h3>


  return (
    <div>
      {toRender}
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
