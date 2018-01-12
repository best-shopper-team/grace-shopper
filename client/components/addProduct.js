import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postProduct} from '../store'
// import history from '../history'

class AddProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      isAvailable: true,
      photoUrl: '',
      categories: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    // this.props.getCategories();
  }

  render () {
    let tempCategories = [ { id: '1', name: 'Festive' }, { id: '2', name: 'Professional' }, { id: '3', name: 'Crazy' } ]
    return (
      <div>
      <h2>Add a Product</h2>
      <form onSubmit={this.handleSubmit} onChange={this.handleUpdate}>
        <label>
          Product Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <br />
        <label>
          Price (in cents):
          <input type="text" name="price" />
        </label>
        <br />
        <label>
          Quantity:
          <input type="text" name="quantity" />
        </label>
        <br />
        <label>
          Photo URL:
          <input type="text" name="photoUrl" />
        </label>
        <br />
        <label>
          Categories:
          (((Sub in this.props.categories)))
          <br />
          {
            tempCategories.map(category =>
            <label key={category.id}>
              <input type="checkbox" name="categories" value={category.id} />
              {category.name}
            </label>)
          }
        </label>
        <br />
          <input type="checkbox" name="isAvailable" value="false" />
            Hide from public view.
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }

  handleUpdate (event) {
    if (event.target.name === 'categories'){
      this.setState({categories: [...this.state.categories, +event.target.value]})
    } else {
      this.setState({[event.target.name]: event.target.value})
    }
    // console.log('this.state: ', this.state)
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createProduct(this.state)
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    createProduct (product) {
      dispatch(postProduct(product))
    },
    // getCategories () {
    //   dispatch(fetchCategories())
    // }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddProduct))
