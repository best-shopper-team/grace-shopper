import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, SingleProduct, Cart} from './components'
import {me} from './store'
import AllProducts from './components/allProducts';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/products/:productId" component={SingleProduct} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays allProducts component as a fallback */}
            <Route component={AllProducts} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
