import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProduct, fetchProductReviews} from '../store'

class SingleProduct extends React.Component {

  componentDidMount(){
    this.props.getProduct();
    this.props.getReviews();
  }

  render(){
    let { product, ratingArray } = this.props;
    let avgRating = ratingArray.length && ratingArray.reduce((total, current) => total + current) / ratingArray.length;
    let dollarPrice = product.price / 100;

    return (
      <div>
        <h3>{product.title}</h3>
        ${dollarPrice}<br />
        Average star rating: {avgRating}/5<br />
        <img id="single-product-page-image" src={`${product.photoUrl}`} /><br />
        Only {product.quantity} remaining!<br />
        {product.description}<br />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    product: state.singleProduct,
    ratingArray: state.reviews.map(review => review.rating)
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

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

// /**
//  * PROP TYPES
//  */
// Main.propTypes = {
//   children: PropTypes.object,
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
