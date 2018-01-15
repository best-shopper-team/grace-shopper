import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import  { SearchBar } from '../components'
import { Icon, Divider, Container, Image  } from 'semantic-ui-react'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, isAdmin } = props

  return (
    <div>
      <nav className="navigation">
        {
          isLoggedIn
            ? <div className="home-products">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
              <Link to="/products">Products</Link>
            </div>
            : <div className="home-products">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
            </div>
        }
        <Image src="http://localhost:8080/favicon.ico" href="/" className="logo" />
        <div className="search-acc-cart">
        <SearchBar />
        {isLoggedIn ?
          <Link to="/myHistory"><Icon name="user" size="large" /></Link> : <Link to="/login"><Icon name="user" size="large" /></Link>}
        <Link to="/cart"><Icon name="shop" size="large" /></Link>
        </div>
        {
          isAdmin &&
          <div className="admin-navigation">
            <Link to="/admin/users">All Users</Link>
            <Link to="/admin/orderhistory">All Orders</Link>
            <Link to="/admin/products/add">Add Product</Link>
          </div>
        }
      </nav>
      <Divider />
      <Container className="children-container">
        {children}
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
