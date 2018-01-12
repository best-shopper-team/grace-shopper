import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const allUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const editUser = user => ({type: EDIT_USER, user})

/**
 * THUNK CREATORS
 */
export function fetchUsers() {
  return function thunk(dispatch) {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsers(users)));
  }
}

export function updateUser(user) {
  return function thunk(dispatch) {
    return axios.put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(updatedUser => dispatch(editUser(updatedUser)));
  }
}

/**
 * REDUCER
 */
export default function (state = allUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case EDIT_USER:
      let newState = [...state];
      let userIndex = state.findIndex(user => user.id === action.user.id);
      newState[userIndex] = action.user;
      return newState;
    default:
      return state
  }
}
