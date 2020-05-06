import React from 'react';
import {NavLink} from 'react-router-dom';

//functional component to display Signed Out Links in the navbar
const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/about'>About</NavLink></li>
      <li><NavLink to='/signin'>Sign In</NavLink></li>
      <li><NavLink to='/signup'>Sign Up</NavLink></li>
    </ul>
  );
}

export default SignedOutLinks