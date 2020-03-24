import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  return (
    <ul className="right">
      <li><NavLink to='/about'>About</NavLink></li>
      <li><NavLink to='/sessions'>Sessions</NavLink></li>
      <li><NavLink to='/newSR'>New Song Request</NavLink></li>
      {/*eslint-disable-next-line*/}
      <li><a onClick={props.signOut}>Sign Out</a></li>
      <li><NavLink to='/' className='btn btn-floating grey lighten-1'>{props.profile.initials}</NavLink></li>
    </ul>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)