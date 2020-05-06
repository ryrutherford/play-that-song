import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom';

class SignIn extends Component {

  //state updates based on what is typed by the user in the email and password fields
  state = {
    email: '',
    password: ''
  }

  //function called to update state when the user types in either the email or password field (represented by e.target.id)
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  //function called when the user submits the form
  handleSubmit = (e) => {
    e.preventDefault();
    //calls the signIn function which will call the signIn action creator
    //the signIn action creator will verify credentials with firebase and dispatch a Success or Error action accordingly
    this.props.signIn(this.state)
  }

  render() {
    //authError will be empty unless the user submitted invalid credentials
    const {authError, auth} = this.props;

    //if the user is already signed in, auth.uid will exist => redirect them to the home page => about page
    if(auth.uid) return <Redirect to="/"/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="black-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email" className="green-text">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password" className="green-text">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn green lighten-1 z-depth-0">Sign In</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

//selecting the authError and auth data from the store
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

//mapping a signIn dispatch function to props
const mapDispatchToProps = (dispatch) => {
  return {
    //forwarding the credentials to the signIn action creator
    signIn: (credentials) => dispatch(signIn(credentials)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
