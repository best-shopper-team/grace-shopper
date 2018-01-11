import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchProduct, postProductReview, me } from '../store'


class WriteReview extends Component {

  constructor(props){
    super(props);
    this.state = {
      rating: 0,
      content: '',
      fireRedirect: false
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.inputDescription = this.inputDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.getProduct();
  }

  handleOptionChange(evt){
    this.setState({
      rating: evt.target.value
    })
  }

  inputDescription(evt){
    console.log('you typed: ', evt.target.value)
    this.setState({
      content: evt.target.value
    })
  }

  handleSubmit(evt){
    evt.preventDefault();
    const review = {
      rating: this.state.rating,
      content: this.state.content,
      userId: this.props.user.id,
      productId: this.props.product.id
    }
    this.props.addReview(review)
    this.setState({fireRedirect: true})
  }

  render(){
    const { product } = this.props


    return (
      <div>
      {this.state.fireRedirect ? <h1>Thanks for your review!</h1> :
        <div>
          <h3>Review {product.title}</h3>
          <form onSubmit={this.handleSubmit}>
            <div id="rating-radio">
              Rating:
              <input type="radio" name="rating" value="1"
              onChange={this.handleOptionChange} />
              <div>1</div>
              <input type="radio" name="rating" value="2"
              onChange={this.handleOptionChange} />
              <div>2</div>
              <input type="radio" name="rating" value="3"
              onChange={this.handleOptionChange} />
              <div>3</div>
              <input type="radio" name="rating" value="4"
              onChange={this.handleOptionChange}/>
              <div>4</div>
              <input type="radio" name="rating" value="5"
              onChange={this.handleOptionChange}/>
              <div>5</div>
            </div>
            <div id="review-input">
              Review:
              <textarea type="text" value={this.state.content}
              name="content" onChange={this.inputDescription} />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      }
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
    },
    getCurrentUser () {
      dispatch(me())
    },
    addReview (review) {
      dispatch(postProductReview(review))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview))
