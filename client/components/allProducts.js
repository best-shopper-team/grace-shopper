import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchProducts, fetchCategories } from '../store'
import { withRouter } from 'react-router'
import { Button, Form, Segment, Card, Image, Divider } from 'semantic-ui-react';
import axios from 'axios'


/**
 * COMPONENT
 */
export class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //if the url has a category then set it to that category. If it does not then initialize state
      currentCategory: props.match.params.category || '',
      displayAddCategory: false,
      newCategory: ''
    }
    this.changeCategory = this.changeCategory.bind(this)
    this.displayAddCategory = this.displayAddCategory.bind(this)
    this.handleNewCategoryInput = this.handleNewCategoryInput.bind(this)
    this.submitNewCategory = this.submitNewCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
    this.props.loadCategories()
  }

  changeCategory(categoryName) {
    this.setState({ currentCategory: categoryName.toLowerCase() })
  }

  submitNewCategory(event) {
    event.preventDefault()
    axios.post('/api/admin/categories/', { name: this.state.newCategory })
      .then(res => res.data)
      .then(() => {
        this.props.loadCategories()
        this.setState({ newCategory: '' })
      })
      .catch(err => console.log(err))
  }

  deleteCategory(){
    axios.delete(`/api/admin/categories/${this.state.currentCategory}`)
      .then(res => res.data)
      .then(() => {
        this.props.loadCategories()
      })
      .catch(err => console.log(err))
  }

  handleNewCategoryInput(event) {
    event.preventDefault()
    this.setState({ newCategory: event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    //for rendering all products when the 'products' navlink is clicked when currentCategory is a category
    const nextCategory = nextProps.match.params.category;
    if (!nextCategory) {
      this.changeCategory('');
    }
  }

  displayAddCategory() {
    this.state.displayAddCategory ? this.setState({ displayAddCategory: false }) : this.setState({ displayAddCategory: true })
  }

  render() {
    //filter products if there is a current category
    let products = (this.state.currentCategory ? this.props.allProducts.filter(product => {
      let shouldRender = false
      product.categories.forEach(category => {
        if (category.name.toLowerCase() === this.state.currentCategory) {
          shouldRender = true;
        }
      })
      return shouldRender
    }) : this.props.allProducts)

    //filter products by search term
    products = (this.props.location.search.split('=')[1] ? products.filter(product => {
      return product.title.toLowerCase().includes(this.props.location.search.split('=')[1].toLowerCase())
    }) : products)

    const { categories, user } = this.props;

    return (
      <div>
        <Segment.Group horizontal id="categories">
          {
            categories.map(category => {
              return (
                <NavLink to={`/products/category/${category.name.toLowerCase()}`} onClick={() => { this.changeCategory(category.name) }} className="category" key={category.id}><Segment basic>{category.name}</Segment></NavLink>
              )
            })
          }
          {
            user.isAdmin &&
            <div className="category">
            <Button id="cat-button" color="blue" size="small" basic onClick={this.displayAddCategory}>+ Category</Button>
            <Button id="cat-button" color="blue" size="small" basic onClick={this.deleteCategory}>- Category</Button>
            </div>
          }
          {
            this.state.displayAddCategory ?
              <Form onSubmit={this.submitNewCategory}>
                <Form.Field onChange={this.handleNewCategoryInput}>
                  <input value={this.state.newCategory} type="text" placeholder="New category" />
                </Form.Field>
              </Form> : null
          }
        </Segment.Group>
        <Card.Group itemsPerRow="5" className="product-group">
          {
            products.map(product => {
              if (product.isAvailable) {
                return (
                  <Card href={`/products/${product.id}`} compact key={product.id}>
                    <Card.Content>
                      <Image src={product.photoUrl} />
                      <Divider />
                      <Card.Description>
                      <p id="all-prod-desc">{product.title}</p>
                      <p id="all-prod-price">{'$' + product.price / 100}</p>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                )
              }
            })
          }
        </Card.Group>
      </div>
    );
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    allProducts: state.allProducts,
    categories: state.categories,
    searchBar: state.searchBar,
    user: state.user
  }
}

const mapDispatch = function (dispatch) {
  return {
    loadProducts: function () {
      const productsThunk = fetchProducts();
      dispatch(productsThunk);
    },
    loadCategories: function () {
      const categoriesThunk = fetchCategories();
      dispatch(categoriesThunk);
    }
  };
}

export default connect(mapState, mapDispatch)(withRouter(AllProducts))
