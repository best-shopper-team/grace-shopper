import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProduct, fetchProductReviews, createCartUserDb, createCartSessionDb} from '../store'
import history from '../history'
import {Message, Button, Container, Rating, Grid, Image} from 'semantic-ui-react'
import {SingleProductReviews} from '../components'

export class SingleProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quantity: null,
      popupVisible: false,
      reviewsVisible: false
    }
    this.adminEditClick = this.adminEditClick.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.seeReviews = this.seeReviews.bind(this)
  }

  componentDidMount(){
    this.props.getReviews();
    this.props.getProduct();
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
  }

  render(){
    let { product, ratingArray, user } = this.props;

    let avgRating = Math.floor(ratingArray.length && ratingArray.reduce((total, current) => total + current) / ratingArray.length);
    // console.log('avgRating: ', avgRating)
    // console.log('ratingArray: ', ratingArray)

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
                <button onClick={this.adminEditClick}>Edit Product</button>
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
            <div id="rating-box">
              <div>Average rating:</div> {avgRating}/5 <Rating defaultRating={avgRating} maxRating={5} disabled />
            </div>
            <div>
              <a onClick={this.seeReviews}>See Reviews</a>
            </div>
            <div>
              <Link to={`/writeReview/products/${product.id}`}>Write A Review</Link>
            </div>
            <br />
            <br />
            <p>{product.description}</p>
            <p>ONLY {product.quantity} REMAINING!</p>
            <br />
            <input type="text" name="quantity" defaultValue="0" onChange={this.handleChange} />
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
