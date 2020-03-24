import React, {Component} from 'react';
import Notifications from '../dashboard//Notifications';
import SongRequestList from '../songRequests/SongRequestList';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

class ActiveSession extends Component {

  //this function checks whether the url entered (i.e. access code) exists or not
  //if it doesn't exist, the user is redirected to the sessions page
  isValidURL = () => {
    const {songRequestSessions, sessionID} = this.props;
    let sessionExists = false;
    if(isLoaded(songRequestSessions)){
      for(let i in songRequestSessions){
        if(songRequestSessions[i].session.sessionID === parseInt(sessionID)){
          sessionExists = true;
          break;
        }
      }
      if(!sessionExists){
        return false;
      }
      return true;
    }
    return false;
  }

  returnSongRequests = () => {
    const {songRequestSessions, sessionID} = this.props;
    if(isLoaded(songRequestSessions)){
      let songRequests = [];
      for(let i in songRequestSessions){
        if(songRequestSessions[i].session.sessionID === parseInt(sessionID)){
          songRequests = songRequestSessions[i].session.songRequests;
          break;
        }
      }
      return songRequests;
    }
  }

  render() {
    const {auth, notifications, sessionID, songRequestSessions} = this.props;
    if(!auth.uid) {
      return <Redirect to='/about'/>
    }
    if(isLoaded(songRequestSessions) && this.isValidURL() === false){
      return <Redirect to='/sessions'/>
    }
    if(isLoaded(songRequestSessions))
      return (
        <div>
          <div className="container">
            <div className="card">
              <div className="card-content break-line">
                <p className="card-title green-text center"><b>Session {sessionID}</b></p>
                <p className="black-text center">Share this code <b>{sessionID}</b> or this link <a href={"https://play-that-song-fac18.firebaseapp.com/activeSession/" + sessionID}>{"https://play-that-song-fac18.firebaseapp.com/activeSession/" + sessionID}</a> with people to allow them to make requests</p>
                <br/>
                <p className="black-text center">Navigate to <a href={"https://play-that-song-fac18.firebaseapp.com/activeSession/" + sessionID}>{"https://play-that-song-fac18.firebaseapp.com/activeSession/" + sessionID}</a> to start requesting songs or go to <a href="https://play-that-song-fac18.firebaseapp.com/sessions">https://play-that-song-fac18.firebaseapp.com/sessions</a> to check out your other active sessions</p>
                <div className="srButton">
                  <button onClick={() => this.props.history.push("/activeSession/" + sessionID + "/createSR")} className="btn green center lighten-1 z-depth-0">Create Song Request</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s12 m6">
                <SongRequestList sessionID={this.props.sessionID} songs={this.returnSongRequests()}/>
              </div>
              <div className="col s12 m5 offset-m1">
                <Notifications notifications={notifications}/>
              </div>
            </div>
          </div>
        </div>
      );
      else {
        return (
          <center>
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </center>
        )
      }
  }
}

const mapStateToProps = (state, ownProps) => {
  let sessionID = ownProps.match.params.session_id;
  return {
    //songs: state.firestore.ordered.songRequestSessions,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    songRequestSessions: state.firestore.data.songRequestSessions,
    sessionID
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'notifications', limit: 10, orderBy: ['time', 'desc']},
    {collection: 'songRequestSessions'}
  ])
)(ActiveSession)