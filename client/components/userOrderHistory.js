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
      <div>
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
          <Table singleLine>
          <Table.Header>
            <Table.Row>
              <th>Order Number</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Order Status</th>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              orders && orders.map(order => {
                return (
                  <Table.Row key={ order.id}>
                  <td>{ order.id}</td>
                  <td>
                    <div>
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
                              <Divider />
                            </div>
                          )
                        })
                      }
                    </div>
                  </td>
                  <td>
                    <div>
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
                    </div>
                  </td>
                  <td>{order.status}</td>
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
