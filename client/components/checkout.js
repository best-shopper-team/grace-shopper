import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCartFromDb, submitCartToDb, getCartSessionFromDb} from '../store'
import {Button, Icon, Form, Checkbox} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class Checkout extends Component{
  constructor(props){
    super(props)
    this.submitOrder = this.submitOrder.bind(this)
    this.state = {
      submitted: false
    }
  }

  componentDidMount(){
    if (this.props.user.id){
      this.props.getCart(this.props.user.id)
    } else {
      this.props.getCartSession()
    }
  }

  submitOrder(e){
    e.preventDefault()
    let newAddress = {
      street: e.target.street.value,
      city: e.target.city.value,
      state:  e.target.state.value,
      zip: e.target.zip.value,
      email: e.target.email.value
    }
    if (newAddress.email && newAddress.street && newAddress.city && newAddress.state && newAddress.zip){
      this.props.submitCart(this.props.cart, newAddress)
      this.setState({submitted: true})
    } else {
      alert('You must fill out all of the required fields in order to submit the cart!')
      
    }
  }

  render(){
    return (
      <div>
      {this.state.submitted ?
        <div>
          <h3>
            Your order has been submitted! A confirmation email has been sent to the email address entered at checkout. <br />Thank you for shopping with us ^_^
          </h3>
          <Link to="/products">
            Continue shopping...
          </Link>
        </div>
      :
        <div>
          <h3>
          Enter Your Shipping and Payment Information
          </h3>
          <Form
            onSubmit={(e) => this.submitOrder(e)}>
            <h5>Shipping Information
            </h5>
            <Form.Group>
            <div>
              <Form.Field required>
                <label>Name</label>
                <input
                  type="text"
                  size="32"
                  id="name"
                  placeholder="John Smith"/>
              </Form.Field>
              <br />
              <Form.Field required>
                <label>Street</label>
                <input
                  type="text"
                  size="32"
                  id="street"
                  placeholder="123 Street St.">
                </input>
              </Form.Field>
              <br />
              <Form.Field required>
                <label>City</label>
                <input
                  type="text"
                  size="32"
                  id="city"
                  placeholder="Chicago">
                </input>
              </Form.Field>
              <br />
              <Form.Field required>
                <label>State</label>
                <input
                  type="text"
                  size="2"
                  id="state"
                  placeholder="IL">
                </input>
              </Form.Field>
              <br />
              <Form.Field required>
                <label>Zip Code</label>
                <input
                  type="text"
                  min="5"
                  max="10"
                  size="10"
                  id="zip"
                  placeholder="60642">
                </input>
              </Form.Field>
              <br />
              <Form.Field required>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  size="32"
                  placeholder="jane@example.com">
                </input>
              </Form.Field>
              <br />
            </div>
            </Form.Group>
            <h5>Payment Information
            </h5>
            <Form.Group>
            <div>
              <span>
                <Form.Field>
                  <label>Credit Card Number</label>
                  <input
                    placeholder="1234 5678 9012 3456"
                    type="text"
                    size="32"
                    id="ccnum">
                  </input>
                </Form.Field>
              </span>
              <br />
              <span>
                <Form.Field>
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    placeholder="00/00"
                    size="5"
                    id="expiry">
                  </input>
                </Form.Field>
              </span>
              <br />
              <span>
              <Form.Field>
                <label>CCV</label>
                <input
                  type="text"
                  placeholder="123"
                  size="3"
                  id="ccv">
                </input>
              </Form.Field>
              </span>
            </div>
            </Form.Group>
            <br />
            <Button
              color="green"
              type="submit">
              <Button.Content>
              Submit Order
              </Button.Content>
            </Button>
          </Form>
        </div>}
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
    getCart: (id) => {
      dispatch(getCartFromDb(id))
    },
    getCartSession: () => {
      dispatch(getCartSessionFromDb())
    },
    submitCart: (cart, address) => {
      dispatch(submitCartToDb(cart, address))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
