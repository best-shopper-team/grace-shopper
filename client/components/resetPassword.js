import React from 'react'
import {connect} from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { updatePassword } from '../store'

class ResetPassword extends React.Component {

  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault()
    const password = evt.target.password.value;
    this.props.changePassword(this.props.user.id, password)
  }

  render(){
    return (
      <div>
        <div>Time is up! Please Reset your password</div>
        <Form  onSubmit={this.handleSubmit} name={name}>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
      </div>
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
    changePassword: (id, pwd) => {
      dispatch(updatePassword(id, pwd))
    }
  }
}



export default connect(mapState, mapDispatch)(ResetPassword)
