import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, SingleProduct, Cart, Checkout, WriteReview, AddProduct, AllProducts, EditProduct, AllUsers, OrderHistory, UserOrderHistory} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/cart/checkout" component={Checkout} />
            <Route exact path="/products/category/:category" component={AllProducts} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/admin/orderHistory" component={OrderHistory} />
                  <Route path="/admin/products/add" component={AddProduct} />
                  <Route path="/admin/products/:productId/edit" component={EditProduct} />
                  <Route exact path="/home" component={UserHome} />
                  <Route exact path="/orderHistory" component={OrderHistory} />
                  <Route exact path="/admin/products/add" component={AddProduct} />
                  <Route exact path="/admin/products/:productId/edit" component={EditProduct} />
                  <Route exact path="/admin/users" component={AllUsers} />
                  <Route exact path="/writeReview/products/:productId" component={WriteReview} />
                  <Route exact path="/products" component={AllProducts} />
                  <Route exact path="/myHistory" component={UserOrderHistory} />
                </Switch>
            }
            {/* Displays allProducts component as a fallback */}
            <Route exact path="/" component={AllProducts} />
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
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
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
