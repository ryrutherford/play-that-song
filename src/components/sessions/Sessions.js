import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Notifications from '../dashboard/Notifications';
import {createSession, deleteSession} from '../../store/actions/sessionActions';

//Class based component that displays all the sessions created by a user, session actions, and notifications
class Sessions extends Component {
  
  state = {
    joinSessionError: null,
    path: null
  }
  
  //returns the signed in users active sessions
  getSessions = () => {
    /*
    * songRequestSessions contains data corresponding to all active sessions
    * auth contains signedIn user data (UID)
    */
    const {songRequestSessions, auth} = this.props;

    let sessionArr = [];
    //when the songRequestSessions data has been loaded we can find all the active sessions for this user
    if(isLoaded(songRequestSessions)){
      for(let i in songRequestSessions){
        if(songRequestSessions[i] !== null){
          if(songRequestSessions[i].creatorID === auth.uid){
            sessionArr.push(songRequestSessions[i].session)
          }
        }
      }
      return sessionArr;
    }
  }

  //function that initiates the joining of a session
  joinSession = (e) => {
    //songRequestSessions contains data corresponding to all active sessions
    const {songRequestSessions} = this.props;
  
    e.preventDefault();

    //retrieving the sessionID
    let sessionID = e.target.elements[0].value;

    //once the songRequestSessions are loaded => we can check whether the sessionID entered is valid
    if(isLoaded(songRequestSessions)){
      let sessionExists = false;
      for(let i in songRequestSessions){
        if(songRequestSessions[i].session.sessionID === parseInt(sessionID, 10)){
          sessionExists = true;
          break;
        }
      }

      //if the session was found in songRequestSessions then we will redirect the user to that session
      if(sessionExists){
        let path = "/activeSession/" + sessionID;
        this.setState({path});
      }
      //otherwise we will inform them that there was an error
      else{
        this.setState({
          joinSessionError: 'The code you entered did not match an active session. Please try again'
        })
      }
    }
  }

  //function that creates a new session
  newSession = () => {
    /*
    * songRequestSessions contains data corresponding to all active sessions
    * createSession calls an action creator which tries to create a new session
    */
    const {songRequestSessions, createSession} = this.props;

    //once the songRequestSessions are loaded we can generate the session accessCode and call the actionCreator
    if(isLoaded(songRequestSessions)){
      //the random sessionID will be the new session's identifier code (6 digit int from 100000 - 999999)
      let sessionID = Math.floor(100000 + Math.random() * 900000);

      //the sessionID must be unique so we must check whether a session with this randomly generated ID exists already
      let tryAgain = false;
      for(let i in songRequestSessions){
        if(songRequestSessions[i].session.sessionID === sessionID){
          tryAgain = true;
          break;
        }
      }
      
      //if tryAgain is true => a session with this sessionID already exists so we must try again
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
      //finally we call the createSession action creator which will dispatch a success, or error action depending on the result from firestore
      //the first param is the session creatorID (the current user's UID), the second param is the randomly generated sessionID
      createSession(this.props.auth.uid, sessionID);
    }
  }

  //code for deleting a session, updates the database and removes the session from firestore
  deleteSession = (e) => {
    e.preventDefault()
    const sessionID = e.target.id;
    this.props.deleteSession(sessionID);
  }

  render(){
    /*
    * auth contains authentication data (UID in particular)
    * notifications contains a list of the 10 most recent song request notifications from firestore
    */
    const {auth, notifications} = this.props;

    //if the user is not authenticated then auth.uid will be undefined and we will redirect to the about page
    if(!auth.uid) {
      return <Redirect to='/about'/>;
    }
    /*
    * if the path attribute of the state object is not empty then: 
    *   - it means the user has entered a valid sessionID in the Join Session Form
    *   - we must redirect them to that path
    */
    if(this.state.path){
      return <Redirect to={this.state.path}/>;
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
                  {/* Getting all of the users active sessions and returning them in a presentable format using map 
                  * If the user has no active sessions => display this info
                  */}
                  {
                    this.getSessions() && this.getSessions().length !== 0 ? (this.getSessions().map((session) => {
                      return(
                        <div key={session.sessionID}>
                          <span className="green-text card-title"><a href={"https://play-that-song-fac18.firebaseapp.com/activeSession/" + session.sessionID}>Session ID: {session.sessionID}</a></span>
                          <button className="btn green lighten-1 z-depth-0" id={session.sessionID} onClick={this.deleteSession}>Delete Session</button>
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

//selecting the auth info, notifications, and songRequestSessions from the store/firestore/firebase
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    songRequestSessions: state.firestore.data.songRequestSessions
  }
}

//mapping dispatch functions to props
const mapDispatchToProps = (dispatch) => {
  /*
  * createSession => creates a new song request session with unique sessionID & adds it to the SongRequestSessions collection in firestore
  * deleteSession => deletes a song request session from the SongRequestSession in firestore, only available to users who have active sessions
  */
  return {
    createSession: (userID, sessionID) => {
      dispatch(createSession(userID, sessionID));
    },
    deleteSession: (sessionID) => {
      dispatch(deleteSession(sessionID));
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