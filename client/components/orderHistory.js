import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table, Button, Dropdown, Form, Label} from 'semantic-ui-react'
import { fetchAllOrders, updateOrder } from '../store'

export class OrderHistory extends Component {

  constructor(props){
    super(props);
    this.state = {
      editing: NaN,
      newStatus: '',
      filter: ''
    }
    this.filterByStatus = this.filterByStatus.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getOrders()
  }

  filterByStatus(evt, {value}){
    this.setState({
      filter: value
    })
  }


  handleEditClick(evt, id){
    evt.preventDefault();
    this.setState({
      editing: +id,
      newStatus: 'inProcess'
    })
  }

  handleSelect(evt){
    this.setState({
      newStatus: evt.target.value
    })
  }

  handleSubmit(evt, id, email){
    evt.preventDefault()
    this.props.submitUpdate(id, this.state.newStatus, email)
    this.setState({
      editing: NaN
    })
  }

  render() {
    let orders = this.props.orders;
    let statusOptions = [
      {
        text: 'All',
        value: ''
      },
      {
        text: 'In Process',
        value: 'inProcess'
      },
      {
        text: 'Submitted',
        value: 'submitted'
      },
      {
        text: 'Shipped',
        value: 'shipped'
      },
      {
        text: 'Cancelled',
        value: 'cancelled'
      }
    ]

    if (this.state.filter.length){
      orders = orders.filter(order => order.status === this.state.filter)
    }

    return (
      <div>
      {
        this.props.user.isAdmin ?
        <div>
          <h3>Complete Order History</h3>
          <Dropdown placeholder="Filter By Status" fluid selection options={statusOptions} onChange={this.filterByStatus} />
          <Table singleLine>
          <Table.Header>
            <Table.Row>
              <th>Order Number</th>
              <th>Order Status</th>
              <th>Edit Order Status</th>
            </Table.Row>
          </Table.Header>
            <Table.Body>
            {
              orders && orders.map(order => {
                const id = order.id;
                const userEmail = order.address.email;
                return (
                  <Table.Row key={id}>
                  <td> {id}</td>
                  <td>
                    {
                      this.state.editing === id ?
                      <select onChange={this.handleSelect}>
                        <option value="inProcess">In Process</option>
                        <option value="submitted">Submitted</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      : order.status
                    }
                  </td>
                  <td>
                  {
                    this.state.editing === id ?
                    <Button onClick={(evt) => this.handleSubmit(evt, id, userEmail)}>update</Button>
                    : <Button onClick={(evt) => this.handleEditClick(evt, id)}>edit status</Button>
                  }
                  </td>
                  </Table.Row>
                )
              })
            }
            </Table.Body>
          </Table>
        </div>
      :
      <h3>You are not an admin! go away!</h3>
      }
      </div>
    )
  }

}

const mapState = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders () {
      dispatch(fetchAllOrders())
    },
    submitUpdate(id, status, email) {
      dispatch(updateOrder(id, status, email))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory);
