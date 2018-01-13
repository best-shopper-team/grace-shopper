import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProducts, fetchCategories} from '../store'
import { withRouter } from 'react-router'


/**
 * COMPONENT
 */
export class AllProducts extends Component {

  constructor (props) {
    super(props);
    this.state = {
      //if the url has a category then set it to that category. If it does not then initialize state
      currentCategory: props.match.params.category || ''
    }
    this.changeCategory = this.changeCategory.bind(this)
  }

  componentDidMount () {
    this.props.loadProducts()
    this.props.loadCategories()
  }

  changeCategory (categoryName) {
    this.setState({currentCategory: categoryName.toLowerCase()})
  }

  componentWillReceiveProps (nextProps) {
    //for rendering all products when the 'products' navlink is clicked when currentCategory is a category
    const nextCategory = nextProps.match.params.category;
    if (!nextCategory) {
      this.changeCategory('');
    }
  }

  render () {
    //filter products if there is a current category
    let products = (this.state.currentCategory ? this.props.allProducts.filter(product => {
      return product.categories[0].name.toLowerCase() === this.state.currentCategory
    }) : this.props.allProducts)

    //filter products by search term
    products = (this.props.searchBar ? products.filter(product => {
      return product.title.toLowerCase().includes(this.props.searchBar.toLowerCase())
    }) : products)

    const categories = this.props.categories;

    return (
      <div>
      <div className="categories">
      {
        categories.map(category => {
          return (
            <Link to={`/products/category/${category.name.toLowerCase()}`} onClick={() => {this.changeCategory(category.name)}} className="category" key={category.id}>{category.name}</Link>
          )
        })
      }
    </div>
        <div className="product-group">
          {
            products.map(product => {
              if (product.isAvailable) {
              return (
                <div className="product" key={product.id}>
                  <img className="product-image" src={product.photoUrl} />
                  <Link to={`/products/${product.id}`}>{ product.title }</Link>
                </div>
              )}
            })
          }
        </div>
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
    searchBar: state.searchBar
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

