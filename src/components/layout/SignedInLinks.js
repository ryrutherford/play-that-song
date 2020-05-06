import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

//functional component to display signed in links and profile initials
const SignedInLinks = (props) => {
  return (
    <ul className="right">
      <li><NavLink to='/about'>About</NavLink></li>
      <li><NavLink to='/sessions'>Sessions</NavLink></li>
      {/*eslint-disable-next-line*/}
      <li><a onClick={props.signOut}>Sign Out</a></li>
      <li><NavLink to='/' className='btn btn-floating grey lighten-1'>{props.profile.initials}</NavLink></li>
    </ul>
  );
}

//mapping a signOut dispatch function to props
const mapDispatchToProps = (dispatch) => {
  return {
    /*
    * when the user clicks on Sign Out the signOut action creator will be called which will call the firebase signOut function
    * depending on the result of the firebase signOut a success or error action will be dispatched
    */
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)