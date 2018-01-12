import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { fetchAllOrders, updateOrder } from '../store'

export class OrderHistory extends Component {

  constructor(props){
    super(props);
    this.state = {
      editing: NaN,
      newStatus: ''
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getOrders()
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

  handleSubmit(evt, id){
    evt.preventDefault()
    this.props.submitUpdate(id, this.state.newStatus)
    this.setState({
      editing: NaN
    })
  }

  render() {
    const orders = this.props.orders;


    return (
      <div>
      {
        this.props.user.isAdmin ?
        <div>
          <h3>Complete Order History</h3>
          <table>
            <tbody>
            <tr>
              <th>Order Number</th>
              <th>Order Status</th>
            </tr>
            {
              orders && orders.map(order => {
                const id = order.id;
                return (
                  <tr key={id}>
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
                      :order.status
                    }
                  </td>
                  <td>
                  {
                    this.state.editing === id ?
                    <button onClick={(evt) => this.handleSubmit(evt, id)}>update</button>
                    :<button onClick={(evt) => this.handleEditClick(evt, id)}>edit status</button>
                  }
                  </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
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
    submitUpdate(id, status) {
      dispatch(updateOrder(id, status))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory);
