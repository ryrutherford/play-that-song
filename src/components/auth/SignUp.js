import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';

class SignUp extends Component {

  //state updates based on what is typed by the user in the respective form fields
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  //function called to update state when the user types in any form field (represented by e.target.id)
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  //function called when the user submits the form
  handleSubmit = (e) => {
    e.preventDefault();
    /*
    * calls the signUp function which will call the signUp action creator
    * the signUp action creator will verify user data with firebase
    * upon success => a new user document is added to the users collection and a Success action is dispatched
    * upon failure => an Error action is dispatched, authError is updated, and the user returns to this page
    */
    this.props.signUp(this.state);    
  }

  render() {
    //authError will be empty unless the user submitted invalid credentials
    const {auth, authError} = this.props;

    //if the user is already signed in they will be redirected to the home page (about page)
    if(auth.uid) return <Redirect to="/"/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="black-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email" className="green-text">Email</label>
            <input type="email" id="email" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="password" className="green-text">Password</label>
            <input type="password" id="password" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="firstName" className="green-text">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName" className="green-text">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <button className="btn green lighten-1 z-depth-0">Sign Up</button>
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
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

//mapping a signUp dispatch function to props
const mapDispatchToProps = (dispatch) => {
  return {
    //forwarding the user data to the signUp action creator
    signUp: (newUser) => dispatch(signUp(newUser)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
