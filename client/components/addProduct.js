import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postCharacter, fetchCharacters, fetchCampaigns} from '../store'
// import history from '../history'

class AddProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      isAvailable: '',
      photoUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
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
          Price:
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
          <input type="checkbox" name="isAvailable" value="false" />
            Hide from public view.
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }

  handleUpdate (event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log('this.state: ', this.state)
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createCharacter(this.state)
  }
}

const mapState = (state, ownProps) => {
  return {
    user: state.user,
    selectedCampaign: state.campaigns.find(campaign => campaign.id === Number(ownProps.match.params.campaignId))
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    createCharacter (character) {
      dispatch(postCharacter(character))
        .then(() => dispatch(fetchCharacters()))
        .then(() => dispatch(fetchCampaigns()))
        .then(() => ownProps.history.push(`/account/user`))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddProduct))
