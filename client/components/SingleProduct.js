import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProduct, fetchProductReviews} from '../store'
import history from '../history'
import {Message, Button, Container, Rating, Grid, Image, Dropdown} from 'semantic-ui-react'

export class SingleProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.productId,
      quantity: null
    }
    this.adminEditClick = this.adminEditClick.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.getProduct();
    this.props.getReviews();
  }

  adminEditClick(){
    history.push(`/admin/products/${this.props.product.id}/edit`)
  }

  addToCart(event){
    event.preventDefault();
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
    console.log('this.state: ', this.state)
  }

  render(){
    let { product, ratingArray, user } = this.props;

    let avgRating = ratingArray.length && ratingArray.reduce((total, current) => total + current) / ratingArray.length;
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
          <Grid.Column width={7}>
            <Image src={`${product.photoUrl}`} />
          </Grid.Column>
          <Grid.Column width={5}>
            <br />
            {
              dollarPrice % 2 ?
              <div>${dollarPrice}0</div>
              : <div>${dollarPrice}</div>
            }
            <br />
            Average rating: <Rating defaultRating={avgRating} maxRating={5} disabled />
            <br />
            <br />
            <p>{product.description}</p>
            <p>ONLY {product.quantity} REMAINING!</p>
            <br />
            <br />
            <input type="text" name="quantity" defaultValue="0" onChange={this.handleChange} />
            <Button
              content="Add to Cart"
              icon="shop"
              labelPosition="left"
              onClick={this.addToCart}
            />
          </Grid.Column>
        </Grid>

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
    ratingArray: state.reviews.map(review => review.rating),
    ratingLength: state.reviews.length
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

