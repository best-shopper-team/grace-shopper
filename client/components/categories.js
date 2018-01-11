import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store'

/**
 * COMPONENT
 */


class Categories extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {

    const categories = this.props.categories;

    return (
      <div className="categories">
        {
          categories.map(category => {
            return (
              <Link to={`./products/category/${category.name.toLowerCase()}`} className="category" key={category.id}>{category.name}</Link>
            )
          })
        }
      </div>
    );
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadCategories: function () {
      const categoriesThunk = fetchCategories();
      dispatch(categoriesThunk);
    }
  }
}

export default connect(mapState, mapDispatch)(Categories)

/**
 * PROP TYPES
 */
Categories.propTypes = {
  categories: PropTypes.array
}
