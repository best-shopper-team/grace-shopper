import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserOrders, fetchProducts } from '../store'
import { Table, Divider, Segment } from 'semantic-ui-react'


export class UserOrderHistory extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.props.loadOrders(this.props.user.id)
    if (!this.props.allProducts.length){
      this.props.loadProducts();
    }
  }

  render() {
    const orders = this.props.orders
    const products = this.props.allProducts
    const isAdmin = this.props.isAdmin

    return (
      <div id="boxThing">
      <h3>Admin Links</h3>
      {
        isAdmin &&
        <Segment.Group compact horizontal className="admin-navigation">
          <Link to="/admin/users"><Segment>All Users</Segment></Link>
          <Link to="/admin/orderhistory"><Segment>All Orders</Segment></Link>
          <Link to="/admin/products/add"><Segment>Add Product</Segment></Link>
        </Segment.Group>
      }
        <h3>Your Order History</h3>
          <Table basic>
          <Table.Header>
            <Table.Row>
              <th>Order Number</th>
              <th>Date Purchased</th>
              <th>TimePurchased</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Item Total</th>
              <th>Order Status</th>
              <th>Order Subtotal</th>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              orders && orders.map(order => {
                return (
                  <Table.Row key={ order.id}>
                  <Table.Cell>{ order.id}</Table.Cell>
                  <Table.Cell>{order && order.purchaseTime ? order.purchaseTime.slice(0, 9): 'Not Yet Purchased'}</Table.Cell>
                  <Table.Cell>{order && order.purchaseTime ? order.purchaseTime.slice(11, 16): ''}</Table.Cell>
                  <Table.Cell>
                    {
                      products.length && order.orderitems && order.orderitems.length && order.orderitems.map(item => {
                        return (
                          <div key={item.id}>
                            <Link to={`/products/${item.productId}`}>
                              {products.find(product => {
                                return (
                                  product.id === item.productId
                                )
                              }).title}
                            </Link>
                            <Divider/>
                          </div>
                        )
                      })
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      products.length && order.orderitems && order.orderitems.length && order.orderitems.map(item => {
                        return (
                          <div key={item.id}>
                          {item.quantity}
                          <Divider />
                          </div>
                        )
                      })
                    }
                  </Table.Cell>
                  <Table.Cell>
                  {
                    products.length && order.orderitems && order.orderitems.length && order.orderitems.map(item => {
                      return (
                        <div key={item.id}>
                        ${parseFloat(item.itemTotal * 0.01).toFixed(2)}
                        <Divider />
                        </div>
                      )
                    })
                  }</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>${
                    parseFloat(
                      (order.orderitems.map(orderitem => orderitem.itemTotal).reduce((accum, currentVal) => accum + currentVal))
                      * 0.01)
                      .toFixed(2)
                    }
                  </Table.Cell>
              </Table.Row>
                )
              })
            }
            </Table.Body>
          </Table>
      </div>
    )

  }

}


const mapState = state => {
  return {
    user: state.user,
    orders: state.orders,
    allProducts: state.allProducts,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrders: (id) => {
      dispatch(fetchUserOrders(id))
    },
    loadProducts: () => {
      dispatch(fetchProducts())
    }
  }
}


export default connect(mapState, mapDispatch)(UserOrderHistory);
