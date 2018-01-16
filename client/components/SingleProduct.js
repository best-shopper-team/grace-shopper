/* eslint complexity:0 */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProduct, fetchProductReviews, createCartUserDb, createCartSessionDb} from '../store'
import history from '../history'

import {Message, Button, Container, Rating, Grid, Image, Input} from 'semantic-ui-react'



import {SingleProductReviews, WriteReview} from '../components'


export class SingleProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quantity: null,
      popupVisible: false,
      reviewsVisible: false,
      writeReviewVisible: false
    }
    this.adminEditClick = this.adminEditClick.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.seeReviews = this.seeReviews.bind(this)
    this.writeReview = this.writeReview.bind(this)
  }

  componentDidMount(){
    this.props.getReviews();
    if (this.props.match.params.productId !== this.props.product.id){
      this.props.getProduct();
    }
  }

  addToCart(event){
    event.preventDefault()
    let info = {
      orderItem: {
        productId: +this.props.product.id,
        quantity: +this.state.quantity,
        itemPrice: +this.props.product.price
      }
    }
    if (this.props.user.id){
      info.userId = +this.props.user.id
      this.props.makeCartUser(info)
    } else {
      this.props.makeCartSession(info)
    }
    this.setState({ popupVisible: true })
    setTimeout(() => {
      this.setState({ popupVisible: false })
    }, 3000)
  }

  adminEditClick(){
    history.push(`/admin/products/${this.props.product.id}/edit`)
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDismiss(){
    this.setState({ popupVisible: false })
  }

  seeReviews(){
    this.setState({ reviewsVisible: true })
    this.setState({ writeReviewVisible: false })
  }

  writeReview(){
    this.setState({ reviewsVisible: false })
    this.setState({ writeReviewVisible: true })
  }

  render(){
    let { product, ratingArray, user } = this.props;

    let avgRating = Math.floor(ratingArray.length && ratingArray.reduce((total, current) => total + current) / ratingArray.length);

    let dollarPrice = product.price / 100;

    return (
      <Container>
        <h2>{product.title}</h2>
        {
          user.isAdmin &&
          <div>
            {
              product.isAvailable ?
              <Message positive>
                <Message.Header>This product is ACTIVE.</Message.Header>
                <br />
                <Button classic onClick={this.adminEditClick}>Edit Product</Button>
              </Message>
              : <Message negative>
                <Message.Header>This product is INACTIVE.</Message.Header>
                <br />
                <Button classic onClick={this.adminEditClick}>Edit Product</Button>
              </Message>
            }
          </div>
        }
        <Grid>
          <Grid.Column width={5}>
            <Image src={`${product.photoUrl}`} />
          </Grid.Column>
          <Grid.Column width={9}>
            <br />
            {
              dollarPrice % 2 ?
              <div>${dollarPrice}0</div>
              : <div>${dollarPrice}</div>
            }
            <br />
            Average rating:
            <br />
            {
              avgRating ? <Rating defaultRating={avgRating} maxRating={5} disabled />
              : 'N/A'
            }
            <br />
            <br />
            <Button basic color="black" content="Read Reviews" onClick={this.seeReviews} />
            <Button basic color="black" content="Write Review" onClick={this.writeReview} />
            <br />
            <br />
            <p>{product.description}</p>
            <p>ONLY {product.quantity} REMAINING!</p>
            <br />
            <Input type="number" name="quantity" defaultValue="1" min="1" onChange={this.handleChange} />
            <br />
            <Button
              content="Add to Cart"
              icon="shop"
              labelPosition="left"
              onClick={this.addToCart}
            />
          </Grid.Column>
        </Grid>
        {
          this.state.popupVisible &&
          <Message
            onDismiss={this.handleDismiss}
            header="Done and done!"
            content={`You have added ${product.title} to your cart.`}
          />
        }
        <br />
        <br />
        {
          this.state.reviewsVisible &&
            <SingleProductReviews />
        }
        {
          this.state.writeReviewVisible &&
            <WriteReview />
        }
      </Container>
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
    ratingArray: state.reviews.map(review => Number(review.rating))
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
    },

  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
