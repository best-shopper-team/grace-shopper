import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchUsers, updateUser} from '../store'
import { Button, Table } from 'semantic-ui-react'

export class AllUsers extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: null
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
  }

  componentDidMount(){
    this.props.getUsers();
  }

  handleEditClick(evt, id){
    evt.preventDefault();
    this.setState({
      id: +id,
      [evt.target.name]: evt.target.value
    })
  }

  handleSelect(evt){
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt){
    evt.preventDefault()
    this.props.submitUpdate(this.state)
    this.setState({ id: null })
  }

  passwordReset(evt, id){
    evt.preventDefault()
    this.props.submitUpdate({id, passwordReset: true})
  }

  render () {
    let { users } = this.props;

    return (
        <div>
          <h3>All Users</h3>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <th>Name</th>
                <th>Admin Status</th>
                <th>Active Status</th>
                <th>Edit Status</th>
                <th>Password Reset</th>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {
              users && users.map(user => {
                const id = user.id;

                return (
                  <Table.Row key={id}>
                  <td> {user.name || 'Anonymous'}</td>
                  <td>
                    {
                      this.state.id === id ?
                      <select name="isAdmin" onChange={this.handleSelect} defaultValue={user.isAdmin}>
                        <option value="false">User</option>
                        <option value="true">Admin</option>
                      </select>
                      : <div>{user.isAdmin ? 'Admin' : 'User'}</div>
                    }
                  </td>
                  <td>
                    {
                      this.state.id === id ?
                      <select name="isActive" onChange={this.handleSelect} defaultValue={user.isActive}>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                      : <div>{user.isActive ? 'Active' : 'Inactive'}</div>
                    }
                  </td>
                  <td>
                  {
                    this.state.id === id ?
                    <Button positive onClick={(evt) => this.handleSubmit(evt, id)}>update</Button>
                    : <Button onClick={(evt) => this.handleEditClick(evt, id)}>Edit</Button>
                  }
                  </td>
                  <td>
                    {
                      user.passwordReset ?
                      <div>Awaiting Password Reset</div>
                      : <Button basic color="orange" onClick={(evt) => this.passwordReset(evt, id)}>Trigger Password Reset</Button>
                    }
                  </td>
                </Table.Row>
                )}
                )
              }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    users: state.allUsers
  }
}

const mapDispatch = function (dispatch) {
  return {
    getUsers () {
      dispatch(fetchUsers());
    },
    submitUpdate(user){
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
