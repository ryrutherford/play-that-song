import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/'>New Session</NavLink></li>
      <li><NavLink to='/'>Join Session</NavLink></li>
      <li><NavLink to='/'>Log Out</NavLink></li>
      <li><NavLink to='/' className='btn btn-floating grey lighten-1'>AR</NavLink></li>
    </ul>
  );
}

export default SignedInLinks