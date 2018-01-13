import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const categories = []

/**
 * ACTION CREATORS
 */
const getCategories = retrievedCategories => ({type: GET_CATEGORIES, retrievedCategories})

/**
 * THUNK CREATORS
 */
export function fetchCategories() {
  return function thunk(dispatch) {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(retrievedCategories => {
        const action = getCategories(retrievedCategories);
        dispatch(action);
      });
  }
}

/**
 * REDUCER
 */
export default function (state = categories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.retrievedCategories
    default:
      return state
  }
}
