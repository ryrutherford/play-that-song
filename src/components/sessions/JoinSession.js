import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const handleSubmit = (e) => {
  e.preventDefault();
  let sessionID = e.target.elements[0].value;
  console.log(sessionID);
}

const JoinSession = (props) => {
  const {auth} = props;
  if (!auth.uid){
    return <Redirect to="/signin"/>
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="black-text text-darken-3">Join Session</h5>
        <div className="input-field green-text">
          <input type="number" id="sessionID" placeholder="Enter Session ID (6 digit code given by the event host)"/>
          <button className="btn green lighten-1 z-depth-0">Join Session</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(JoinSession)