import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { button } from 'react-router-dom'
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

  filterByStatus(evt){
    this.setState({
      filter: evt.target.value
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

  handleSubmit(evt, id){
    evt.preventDefault()
    // pass userEmail into handleSubmit and submitUpdate
    this.props.submitUpdate(id, this.state.newStatus)
    this.setState({
      editing: NaN
    })
  }

  render() {
    let orders = this.props.orders;

    if (this.state.filter.length){
      orders = orders.filter(order => order.status === this.state.filter)
    }

    return (
      <div>
      {
        this.props.user.isAdmin ?
        <div>
          <h3>Complete Order History</h3>
          <div>Filter By Status:</div>
          <div id="filter-by-status-radios">
            <div>
              <div>All Orders</div>
              <input
type="radio" name="rating" value=""
              onChange={this.filterByStatus} />
            </div>
            <div>
              <div>In Process</div>
              <input
type="radio" name="rating" value="inProcess"
              onChange={this.filterByStatus} />
            </div>
            <div>
                <div>Submitted</div>
              <input
type="radio" name="rating" value="submitted"
              onChange={this.filterByStatus} />
            </div>
            <div>
              <div>Shipped</div>
              <input
type="radio" name="rating" value="shipped"
              onChange={this.filterByStatus} />
            </div>
            <div>
              <div>Cancelled</div>
              <input
type="radio" name="rating" value="cancelled"
              onChange={this.filterByStatus} />
            </div>
          </div>
          <table>
            <tbody>
            <tr>
              <th>Order Number</th>
              <th>Order Status</th>
            </tr>
            {
              orders && orders.map(order => {
                const id = order.id;
                // const userEmail = need to eager load once Address reducer is set up
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
                      : order.status
                    }
                  </td>
                  <td>
                  {
                    this.state.editing === id ?
                    // pass userEmail into handlSubmit
                    <button onClick={(evt) => this.handleSubmit(evt, id)}>update</button>
                    : <button onClick={(evt) => this.handleEditClick(evt, id)}>edit status</button>
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
      // pass email into submitUpdate and updateOrder
      dispatch(updateOrder(id, status))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory);
