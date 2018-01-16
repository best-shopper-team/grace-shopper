import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProduct, fetchProductReviews } from '../store'
import {Rating, Segment} from 'semantic-ui-react'

export class SingleProductReviews extends React.Component {

  componentDidMount(){
    if (!this.props.reviews.length){
      this.props.getReviews();
    }
    if (!this.props.product.length) {
      this.props.getProduct();
    }
  }

  render(){
    let { reviews } = this.props;

    return (
      <Segment raised>
          <h3>Reviews</h3>
          {
            reviews.length ?
            reviews.map(review =>
              <Segment vertical key={review.id}>
                <Rating defaultRating={review.rating} maxRating={5} disabled />
                <br />
                "{review.content}"
                <br />
                by {review.user && review.user.name}
                <br />
              </Segment>)
            : <div>No reviews yet!</div>
          }
          </Segment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    product: state.singleProduct,
    reviews: state.reviews
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId;
  return {
    getProduct () {
      dispatch(fetchProduct(productId))
    },
    getReviews () {
      dispatch(fetchProductReviews(productId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProductReviews))

