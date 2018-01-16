import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ResetPassword from './resetPassword'
import InactiveUser from './InactiveUser'
import LandingPage from './landingPage'

/**
 * COMPONENT
 */
export const UserHome = (props) => {

  let toRender;

  if (!props.user.isActive)toRender = <InactiveUser />
  else if (props.user.passwordReset) toRender = <ResetPassword />
  else toRender = <LandingPage />

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
