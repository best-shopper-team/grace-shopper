
/**
 * ACTION TYPES
 */
const ADD_SEARCH_TERM = 'ADD_SEARCH_TERM'

/**
 * INITIAL STATE
 */
const currentSearch = ''

/**
 * ACTION CREATORS
 */
export const addSearchTerm = searchTerm => ({type: ADD_SEARCH_TERM, searchTerm})

/**
 * REDUCER
 */
export default function (state = currentSearch, action) {
  switch (action.type) {
    case ADD_SEARCH_TERM:
      return action.searchTerm
    default:
      return state
  }
}
