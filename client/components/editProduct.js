import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProduct, editProduct} from '../store'
import history from '../history'

class EditProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: +props.match.params.productId,
      title: props.product.title,
      description: props.product.description,
      price: props.product.price,
      quantity: props.product.quantity,
      isAvailable: props.product.isAvailable,
      photoUrl: props.product.photoUrl,
      // categories: props.categories
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    // If the admin goes straight to this URL, will fetch the product info.
    if (!this.props.product.title){
      this.props.getProduct();
    }
  }

  componentWillReceiveProps(nextProps) {
    let prod = nextProps.product
    if (!this.props.product.title) this.setState({ title: prod.title });
    if (!this.props.product.description) this.setState({ description: prod.description });
    if (!this.props.product.price) this.setState({ price: prod.price });
    if (!this.props.product.quantity) this.setState({ quantity: prod.quantity });
    if (!this.props.product.isAvailable) this.setState({ isAvailable: prod.isAvailable });
    if (!this.props.product.photoUrl) this.setState({ photoUrl: prod.photoUrl });
    // if (!this.props.product.categories) this.setState({ categories: nextProps.categories });

  }

  render () {
    // let tempCategories = [ { id: '1', name: 'Festive' }, { id: '2', name: 'Professional' }, { id: '3', name: 'Crazy' } ]
    let { product } = this.props
    if (product.title === undefined){
      return (
        <div />
      )
    } else {
      return (
        <div>
        <h2>Edit a Product</h2>
        <form onSubmit={this.handleSubmit} onChange={this.handleUpdate}>
          <label>
            Product Title:
            <input type="text" name="title" defaultValue={product.title} />
          </label>
          <br />
          <label>
            Description:
            <input type="text" name="description" defaultValue={product.description} />
          </label>
          <br />
          <label>
            Price (in cents):
            <input type="text" name="price" defaultValue={product.price} />
          </label>
          <br />
          <label>
            Quantity:
            <input type="text" name="quantity" defaultValue={product.quantity} />
          </label>
          <br />
          <label>
            Photo URL:
            <input type="text" name="photoUrl" defaultValue={product.photoUrl} />
          </label>
          <br />
          <label>
            Categories:
            <br />
            {/*
              tempCategories.map(category =>
              <label key={category.id}>
                <input type="checkbox" name="categories" value={category.id} />
                {category.name}
              </label>)
              */}
          </label>
          <br />
            <input type="checkbox" name="isAvailable" defaultValue={product.isAvailable} />
              Hide from public view.
          <br />
          <input type="submit" value="Submit" />
        </form>
        </div>
      )
    }
  }

  handleUpdate (event) {
    // if (event.target.name === 'categories'){
    //   this.setState({categories: [...this.state.categories, +event.target.value]})
    // } else {
    this.setState({[event.target.name]: event.target.value})
    // }
    // console.log('this.state: ', this.state)
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.updateProduct(this.state);
    history.push(`/products/${this.state.id}`);
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct
    // categories: state.categories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId;
  return {
    updateProduct (product) {
      dispatch(editProduct(product))
    },
    getProduct () {
      dispatch(fetchProduct(productId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditProduct))
