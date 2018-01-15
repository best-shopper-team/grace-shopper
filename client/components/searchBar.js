import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSearchTerm } from '../store'
import { withRouter } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
/**
 * COMPONENT
 */
export class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      isActive: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
  }

  toggleSearch () {
    this.state.isActive ? this.setState({isActive: false}) : this.setState({isActive: true})
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
    this.state.isActive ?
    <form className="ui search"
    onSubmit={this.handleSubmit}
    >
      <input
        className="prompt"
        type="text"
        placeholder="Search..."
        onChange={this.handleChange}
      />
    </form> : <Icon name="search" size="large" color="blue" onClick={this.toggleSearch} />
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

