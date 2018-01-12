import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class Checkout extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
      <h4>
      This is checkout page
      </h4>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(Checkout)
