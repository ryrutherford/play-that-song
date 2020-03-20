import React, {Component} from 'react';
import Notifications from '../dashboard//Notifications';
import SongRequestList from '../songRequests/SongRequestList';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

class ActiveSession extends Component {
  isValidURL = () => {
    const {songRequestSessions, sessionID, history} = this.props;
    let sessionExists = false;
    if(isLoaded(songRequestSessions)){
      for(let i in songRequestSessions){
        if(songRequestSessions[i].session.sessionID === sessionID){
          sessionExists = true;
          break;
        }
      }
      if(!sessionExists){
        console.log(sessionExists, "session exists");
        history.push("/sessions")
        return false;
      }
      return true;
    }
    return false;
  }
  render() {
    this.isValidURL();
    const {songs, auth, notifications, sessionID} = this.props;
    if(!auth.uid) {
      return <Redirect to='/about'/>
    }
    return (
      <div>
        <div className="container">
          <div className="card">
            <div className="card-content break-line">
              <p className="card-title green-text center"><b>Session {sessionID}</b></p>
              <p className="black-text center">Share this code <b>{sessionID}</b> or this link <a href={"http://localhost:3000/activeSession/" + sessionID}>{"http://localhost:3000/activeSession/" + sessionID}</a> with people to allow them to make requests</p>
              <br/>
              <p className="black-text center">Navigate to <a href={"http://localhost:3000/activeSession/" + sessionID}>{"http://localhost:3000/activeSession/" + sessionID}</a> to start requesting songs or go to <a href="https://localhost:3000/sessions">https://localhost:3000/sessions</a> to check out your other active sessions</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <SongRequestList songs={songs}/>
            </div>
            <div className="col s12 m5 offset-m1">
              <Notifications notifications={notifications}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  let sessionID = ownProps.match.params.session_id;
  return {
    songs: state.firestore.ordered.songRequests,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    songRequestSessions: state.firestore.data.songRequestSessions,
    sessionID
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'songRequests', orderBy: ['numRequests', 'desc']},
    {collection: 'notifications', limit: 10, orderBy: ['time', 'desc']},
    {collection: 'songRequestSessions'}
  ])
)(ActiveSession)