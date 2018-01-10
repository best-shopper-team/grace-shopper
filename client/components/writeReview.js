import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProduct } from '../store'


class WriteReview extends Component{


  render(){
    return(
      <div>
        <h3>Review PRODUCTNAME</h3>
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

const mapDispatch = (dispatch) => {
  const productId = 4
  return {
    getProduct () {
      dispatch(fetchProduct(productId))
    }
  }
}

export default(connect(mapState, mapDispatch)(WriteReview))
