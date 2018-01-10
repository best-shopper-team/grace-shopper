import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store'

/**
 * COMPONENT
 */
export const Categories = (props) => {
  const {categories} = props

  return (
    <div>
      {
        categories.map(category => {
          return (
            <Link key={category.id}>{category.name}</Link>
          )
        })
      }
    </div>
  )
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
    loadCategories: function() {
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
