import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'



const InactiveUser = (props) => {


  return (
    <div>
      <h2>Your account has been deactivated.</h2>
      <p>Please contact us at admin@lifesocksshopper.com to reactivate your account.</p>
    </div>
  )
}

export default InactiveUser
