import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';

//functional component which defines the Navbar based on whether the user is Signed In or Signed Out
const Navbar = (props) => {
  const {auth, profile} = props;
  //if the user is signed in, auth.uid will exist and we will get the SignedInLinks, otherwise we get SignedOutLinks
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>;
  return (
    <nav className="nav-wrapper green ligthen-1">
      <div className="container">
          <Link to='/' className="brand-logo">Play That Song</Link>
          {links}
      </div>
    </nav>
  );
}

//selecting the auth and profile data from the store (and firebase)
const mapStateToProps = (state) => {
  return {
    //the auth object contains the user's UID
    auth: state.firebase.auth,
    //the profile object contains the data to display the User's initials in the Navbar
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)