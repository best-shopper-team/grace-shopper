import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserOrders, fetchProducts } from '../store'
import { Table, Divider } from 'semantic-ui-react'


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

    return (
      <div>
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
    allProducts: state.allProducts
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
