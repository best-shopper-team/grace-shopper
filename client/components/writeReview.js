import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchProduct, postProductReview, me } from '../store'
import { Rating, Form, Radio } from 'semantic-ui-react'




export class WriteReview extends Component {

  constructor(props){
    super(props);
    this.state = {
      rating: '',
      content: '',
      warn: false,
      fireRedirect: false
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
    console.log(evt.target.value);
    this.setState({
      rating: evt.target.value
    })
  }

  starChange(evt, value){
    evt.persist()
    console.log(evt)
    console.log('target: ', evt.target)
    console.log('value: ', value)
    console.log('aria-posinset', evt.target['aria-posinset'])
    console.log('keys: ', Object.keys(evt.target))
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
      this.setState({fireRedirect: true})
    }
  }

  render(){
    const { product } = this.props


    return (
      <div>
      {this.state.fireRedirect ? <Redirect to={`/products/${product.id}`} /> :
        <div>
          <h3>Review {product.title}</h3>
          <div className="review-component-box">
            <img className="product-image" src={product.photoUrl} />
            <div>Description: </div>
            <div>{product.description}</div>
          </div>
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
                <input type="submit" value="Submit" />
              </div>
            </Form.Field>
          </Form>
          <div>{this.state.warn && 'You must include a rating!'}</div>
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
    addReview (review) {
      dispatch(postProductReview(review))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview));


/*    <div id="rating-radio">
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
    </div>*/
