import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProduct, fetchProductReviews, createCartUserDb, createCartSessionDb} from '../store'
import history from '../history'

export class SingleProduct extends React.Component {
  constructor(){
    super();
    this.adminEditClick = this.adminEditClick.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount(){
    this.props.getProduct();
    this.props.getReviews();
  }

  addToCart(e){
    e.preventDefault()
    let info = {
      orderItem: {
        productId: +this.props.product.id,
        quantity: 1,
        itemPrice: +this.props.product.price
      }
    }
    if (this.props.user.id){
      info.userId = +this.props.user.id
      this.props.makeCartUser(info)
    } else {
      this.props.makeCartSession(info)
    }
  }

  adminEditClick(){
    history.push(`/admin/products/${this.props.product.id}/edit`)
  }

  render(){
    let { product, ratingArray, user } = this.props;

    let avgRating = ratingArray.length && ratingArray.reduce((total, current) => total + current) / ratingArray.length;
    let dollarPrice = product.price / 100;

    return (
      <div>
        <h3>{product.title}</h3>
        {
          user.isAdmin && <button onClick={this.adminEditClick}>Edit Product</button>
        }
        <br />
        ${dollarPrice}<br />
        Average star rating: {avgRating}/5<br />
        <img id="single-product-page-image" src={`${product.photoUrl}`} /><br />
        Only {product.quantity} remaining!<br />
        {product.description}<br />
        <button
        onClick={(e) => {this.addToCart(e)}}>
        Add To Cart
        </button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
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
    },
    makeCartUser(info){
      dispatch(createCartUserDb(info))
    },
    makeCartSession(info){
      dispatch(createCartSessionDb(info))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

