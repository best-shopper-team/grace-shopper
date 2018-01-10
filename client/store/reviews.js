import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PROD_REVIEWS = 'GET_PROD_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getProductReviews = reviews => ({type: GET_PROD_REVIEWS, reviews})

/**
 * THUNK CREATORS
 */
export const fetchProductReviews = productId =>
  dispatch =>
    axios.get(`/api/reviews/product/${productId}`)
      .then(res =>
        dispatch(getProductReviews(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_PROD_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
