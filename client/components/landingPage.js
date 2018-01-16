import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUser} from '../store'
import {Form, Button, Checkbox, Container, Radio, Dropdown} from 'semantic-ui-react'
import history from '../history'
import {Link} from 'react-router-dom'

class LandingPage extends React.Component {

  render () {

    return (
      <Container id="landing-page-container">
        <div id="landing-page-text-container">
          <h1 id="landing-page-header">Hey, {this.props.user.name}. <br /><br />Take off your shoes.<br />Stay a while. </h1>
        </div>
        <Link to="/products"><img id="landing-page-image" src="https://pixel.nymag.com/imgs/daily/strategist/2017/04/26/mens-socks/26-mwns-socks-lede.w710.h473.2x.jpg" /></Link>
    </Container>
    )
  }

}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default withRouter(connect(mapState, mapDispatch)(LandingPage))
