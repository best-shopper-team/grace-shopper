import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProduct, editProduct, fetchCategories} from '../store'
import history from '../history'
import {Form, Button, Container, Radio, Dropdown} from 'semantic-ui-react'

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
      categories: props.productCategories
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCategories = this.handleCategories.bind(this)
    this.handleVisibility = this.handleVisibility.bind(this)
  }

  componentDidMount() {
    // if the admin goes straight to this URL, will fetch the product info
    if (!this.props.product.title){
      this.props.getProduct();
    }
    if (!this.props.product.reviews){
      this.props.getCategories();
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
    if (!this.props.product.categories) this.setState({ categories: nextProps.productCategories });

  }

  render () {
    let { product, categories, productCategories } = this.props
    let prodCat = productCategories && productCategories.map(category => category.id)

    let visibilityOptions = [
      {
        key: 'available',
        value: true,
        text: 'Active'
      },
      {
        key: 'unavailable',
        value: false,
        text: 'Inactive'
      }
    ]

    let categoryOptions = categories.map(category => {
       return {
          key: category.name,
          value: category.id,
          text: category.name
        }
    })

    if (product.categories === undefined){
      return (
        <div />
      )
    } else {
      return (
        <Container>
        <h2>Edit a Product</h2>
        <Form onSubmit={this.handleSubmit} onChange={this.handleUpdate}>
        <Form.Field>
          <label>Product Title</label>
          <input type="text" name="title" defaultValue={product.title} />
        </Form.Field>
        <br />
        <Form.Field width={8}>
          <label>Description</label>
          <input type="text" name="description" defaultValue={product.description} />
        </Form.Field>
        <br />
        <Form.Group>
          <Form.Field>
            <label>Price</label>
            <input type="text" name="price" defaultValue={product.price / 100} />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Quantity</label>
            <input type="text" name="quantity" defaultValue={product.quantity} />
          </Form.Field>
        </Form.Group>
        <br />
        <Form.Field>
          <label>Photo URL</label>
          <input type="text" name="photoUrl" defaultValue={product.photoUrl} />
        </Form.Field>
        <br />
        <Form.Field>
          <label>Categories</label>
              <Dropdown placeholder="Select Categories" fluid multiple selection options={categoryOptions} onChange={this.handleCategories} defaultValue={prodCat} />
        </Form.Field>
        <br />
        <Form.Field>
          <label>Visibility</label>
          <Dropdown placeholder="Select Availability" fluid selection options={visibilityOptions} onChange={this.handleVisibility} defaultValue={product.isAvailable} />
        </Form.Field>
        <br />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>)
    }
  }

  handleCategories (event, value) {
    this.setState({ categories: value.value })
  }

  handleVisibility (event, value) {
    this.setState({ isAvailable: value.value })
  }

  handleUpdate (event) {
    if (event.target.name === 'price'){
      this.setState({ price: event.target.value * 100 })
    } else {
      this.setState({[event.target.name]: event.target.value})
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.updateProduct(this.state);
    history.push(`/products/${this.state.id}`);
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    productCategories: state.singleProduct.categories,
    categories: state.categories
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
    },
    getCategories () {
      dispatch(fetchCategories(productId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditProduct))
