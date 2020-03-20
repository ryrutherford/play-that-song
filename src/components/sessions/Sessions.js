import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Notifications from '../dashboard/Notifications';
import {createSession} from '../../store/actions/sessionActions';

class Sessions extends Component {
  state = {
    joinSessionError: null
  }
  //returns the signed in users active sessions
  getSessions = () => {
    const {songRequestSessions, auth} = this.props;
    let sessionArr = [];
    if(isLoaded(songRequestSessions)){
      for(let i in songRequestSessions){
        if(songRequestSessions[i].creatorID === auth.uid){
          sessionArr.push(songRequestSessions[i].session)
        }
      }
      console.log(sessionArr, "session array");
      return sessionArr;
    }
  }

  //function that initiates the joining of a session
  joinSession = (e) => {
    const {songRequestSessions, history} = this.props;
    e.preventDefault();
    let sessionID = e.target.elements[0].value;
    if(isLoaded(songRequestSessions)){
      let sessionExists = false;
      for(let i in songRequestSessions){
        console.log(songRequestSessions[i].session.sessionID, sessionID, "comparison");
        if(songRequestSessions[i].session.sessionID === sessionID){
          console.log("comp true");
          sessionExists = true;
          break;
        }
      }

      //if the session was found in songRequestSessions then we will redirect the user to that session
      if(sessionExists){
        history.push("/activeSession/" + sessionID);
      }
      else{
        this.setState({
          joinSessionError: 'The code you entered did not match an active session. Please try again'
        })
      }
    }
  }

  //function that creates a new session
  newSession = () => {
    const {songRequestSessions, createSession, history} = this.props;
    if(isLoaded(songRequestSessions)){
      //the random sessionID will be the new session's identifier code
      let sessionID = Math.floor(100000 + Math.random() * 900000);

      //songRequestSessions is an array of sessions retrieved from firestore, it will be undefined initially
      let tryAgain = false;
      for(let i in songRequestSessions){
        console.log(songRequestSessions[i].session.sessionID, sessionID, "comparison");
        if(songRequestSessions[i].session.sessionID === sessionID){
          tryAgain = true;
          break;
        }
      }
      
      //if the songRequestSessionIDs array is non empty then the sessionID already exists so we must try again
      while(tryAgain){
        sessionID = Math.floor(100000 + Math.random() * 900000);
        for(let i in songRequestSessions){
          if(songRequestSessions[i].session.sessionID === sessionID){
            tryAgain = true;
          }
          else{
            tryAgain = false;
          }
        }
      }
      console.log(sessionID,"dispatching action")
      createSession(this.props.auth.uid, sessionID);
      history.push("/activeSession/" + sessionID);
    }
  }
  render(){
    const {auth, notifications} = this.props;
    if(!auth.uid) {
      return <Redirect to='/about'/>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="section">
              <h3 className="green-text">Sessions</h3>
              <div className="card">
                <div className="card-content">
                  <div className="session center">
                    <button onClick={this.newSession} className="btn green lighten-1 z-depth-0 ">New Session</button>
                    <br/>
                    <form onSubmit={this.joinSession} className="white">
                      <div className="input-field green-text">
                        <input type="number" id="sessionID" placeholder="Enter Session ID (6 digit code)"/>
                        <button className="btn green lighten-1 z-depth-0">Join Session</button>
                      </div>
                    </form>
                    {this.state.joinSessionError ? <p className="red-text">{this.state.joinSessionError}</p> : null}
                  </div>
                  <h5 className="black-text text-darken-3">Active Sessions</h5>
                  {
                    this.getSessions() ? (this.getSessions().map((session) => {
                      return(
                        <div key={session.sessionID}>
                          <span className="green-text card-title">Session ID: {session.sessionID}</span>
                          <a href={"http://localhost:3000/activeSession/" + session.sessionID}>View Session</a>
                          <hr/>
                        </div>
                      )
                    })) : (<p>You don't have any active sessions</p>)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    songRequestSessions: state.firestore.data.songRequestSessions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSession: (userID, sessionID) => {
      dispatch(createSession(userID, sessionID));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'notifications', limit: 10, orderBy: ['time', 'desc']},
    {collection: 'songRequestSessions'}
  ])
)(Sessions)