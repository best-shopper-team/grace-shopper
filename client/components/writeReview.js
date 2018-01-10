import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchProduct } from '../store'


class WriteReview extends Component{

  componentDidMount(){
    this.props.getProduct();
  }

  render(){
    const { product } = this.props

    console.log("product: ", product)

    return(
      <div>
        <h3>Review {product.title}</h3>
        <form>
          <div id="rating-radio">
            Rating:
            <input type="radio" name="rating" value="1"></input>
            <div>1</div>
            <input type="radio" name="rating" value="2"></input>
            <div>2</div>
            <input type="radio" name="rating" value="3"></input>
            <div>3</div>
            <input type="radio" name="rating" value="4"></input>
            <div>4</div>
            <input type="radio" name="rating" value="5"></input>
            <div>5</div>
          </div>
          <div id="review-input">
            Review:
            <textarea type="text"></textarea>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    product: state.singleProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    getProduct () {
      dispatch(fetchProduct(productId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview))
