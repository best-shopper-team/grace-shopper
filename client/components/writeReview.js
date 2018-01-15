import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchProduct, postProductReview, me, fetchProductReviews } from '../store'
import { Rating, Form, Radio, Button, Segment, Message } from 'semantic-ui-react'


export class WriteReview extends Component {

  constructor(props){
    super(props);
    this.state = {
      rating: '',
      content: '',
      warn: false,
      reviewSubmitted: false,
      popupVisible: false
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.inputDescription = this.inputDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.starChange = this.starChange.bind(this)
  }

  componentDidMount(){
    this.props.getProduct();
  }

  handleOptionChange(evt){
    this.setState({
      rating: evt.target.value
    })
  }

  handleDismiss(){
    this.setState({ popupVisible: false })
  }

  starChange(evt, value){
    evt.persist()
  }

  inputDescription(evt){

    this.setState({
      content: evt.target.value
    })
  }

  handleSubmit(evt){
    evt.preventDefault();
    if( this.state.rating === ''){
      this.setState({warn: true})
    }
    else{
      const review = {
        rating: this.state.rating,
        content: this.state.content,
        userId: this.props.user.id,
        productId: this.props.product.id
      }
      this.props.addReview(review)
      this.props.getReviews(review.productId)
      this.setState({reviewSubmitted: true})
    }
  }

  render(){
    const { product } = this.props


    return (
      <div>
      {this.state.reviewSubmitted ?
          <Message
            onDismiss={this.handleDismiss}
            header="Thank you!"
            content={`Your review for ${product.title} has been added.`}
          />
        :
        <Segment raised>
          <h3>Write a review for {product.title}</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field id="submit-review-box">
                <div id="rating-box">
                  Rating:
                  <div id="rating-radio">
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
              </div>
            </Form.Field>
            <Form.Field>
              <div id="review-input">
                Review:
                <textarea type="text" value={this.state.content}
                name="content" onChange={this.inputDescription} />
              </div>
              <div>
                <Button type="submit" value="Submit">Submit</Button>
              </div>
            </Form.Field>
          </Form>
          <div>{this.state.warn && 'You must include a rating!'}</div>
        </Segment>
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
    addReview (review) {
      dispatch(postProductReview(review))
    },
    getReviews () {
      dispatch(fetchProductReviews(productId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview));
