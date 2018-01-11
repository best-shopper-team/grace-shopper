import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PROD_REVIEWS = 'GET_PROD_REVIEWS'
const ADD_REVIEW_TO_STATE = 'ADD_REVIEW_TO_STATE'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getProductReviews = reviews => ({type: GET_PROD_REVIEWS, reviews})

const addReviewToState = review => {
  return {
    type: ADD_REVIEW_TO_STATE,
    review
  }
}

/**
 * THUNK CREATORS
 */
export const fetchProductReviews = productId =>
  dispatch =>
    axios.get(`/api/reviews/product/${productId}`)
      .then(res =>
        dispatch(getProductReviews(res.data)))
      .catch(err => console.log(err))

export const postProductReview = (reviewData) => dispatch => {
  axios.post(`/api/reviews`, reviewData)
    .then(res => {
      dispatch(addReviewToState(res.data))
    })
    .catch(err => console.error('error posting new review', err))
}

/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_PROD_REVIEWS:
      return action.reviews
    case ADD_REVIEW_TO_STATE:
      return [...state, action.review]
    default:
      return state
  }
}
