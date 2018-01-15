import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSearchTerm } from '../store'
import { withRouter } from 'react-router-dom'
/**
 * COMPONENT
 */
export class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({searchTerm: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.history.push(`/products?keywords=${this.state.searchTerm}`);
    this.props.addSearch(this.state.searchTerm)
  }

  render () {

  return (
    <form
className="ui search"
    onSubmit={this.handleSubmit}
    >
      <input
        className="prompt"
        type="text"
        placeholder="Search..."
        onChange={this.handleChange}
      />
    </form>

  )
}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    addSearch: function (term) {

      dispatch(addSearchTerm(term))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SearchBar))

