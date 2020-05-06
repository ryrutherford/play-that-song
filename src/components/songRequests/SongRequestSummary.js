import React from 'react';
import {connect} from 'react-redux';
import {undoRequest, createSongRequestFromDashboard, deleteNotifications} from '../../store/actions/songActions';

//functional component that displays a card with data about an individual song request
//NOTE: I am currently not using the creatorID but it may prove useful in future versions
const SongRequestSummary = ({auth, song, creatorID, sessionID, undoRequest, createSongRequestFromDashboard, deleteNotifications}) => {

  //event handler that will call the undoRequest action creator
  //function will be triggered when a user who has already requested a song in a session clicks "Undo Request"
  const handleClickUndo = (e) => {
    e.preventDefault();
    undoRequest(e.target.id, auth.uid, sessionID); //first param is the songID, second is the user id
  }

  //event handler that will call the createSongRequestFromDashboard action creator and deleteNotifications action creator
  //the deleteNotifications action creator is called to make sure the Notifications collection in firestore doesn't exceed storage limits
  const handleClickRequest = (e) => {
    e.preventDefault();
    createSongRequestFromDashboard(e.target.id, auth.uid, sessionID);
    deleteNotifications();
  }

  return (
    <div className="song-with-album card" id={song.id} key={song.id}>
    <img src={song.albumIMGURL} alt="Album Cover"/>
    <div className="card-content">
      {auth.uid === creatorID ? (
            /*eventually add functionality that lets the creator remove song requests*/ 
            null
            ) : (
              null
            )
          }
      <span className="card-title green-text">
      <a target="_blank" rel="noreferrer noopener" title="Play on Spotify" href={song.externalURL} className="green-text">{song.title}</a>
      </span>
      <p className="black-text">{"Song • " + song.artists.join(", ")}</p>
      <p className="black-text">
        <b>{song.numRequests === 1 ? (song.numRequests + " Request") : (song.numRequests + " Requests")}</b>
      </p>
      <div>
        {/* 
        * If this song request has been requested by the current user
        *   Display an undo request button if they change their mind
        * Otherwise display a Request Song button so they can request the song from the session page
        */}
        {song.requestors.includes(auth.uid) ? (
            <button onClick={handleClickUndo} id={song.songID} className="btn red lighten-1 z-depth-0">Undo Request</button>
          ) : (
            <button onClick={handleClickRequest} id={song.songID} className="btn green lighten-1 z-depth-0">Request Song</button> 
          )
        }
      </div>
    </div>
  </div>
  );
}

//selecting the auth data from the store
//NOTE: I am currently not using this data; however, it may prove useful in future updates
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

//mapping some dispatch functions to props
const mapDispatchToProps = (dispatch) => {
  /* 
  * createSongRequestFromDashboard: calls an action creator that will update the number of requests a song in a particular session has (using firestore)
  * undoRequest: calls an action creator that will update the number of requests (or delete a request) for a song in a particular session (using firestore)
  * deleteNotifications: calls an action creator that will delete all notifications except for the 10 most recent ones once the number of notifications exceeds 500
  */
  return {
    createSongRequestFromDashboard: (songID, userID, sessionID) => {
      dispatch(createSongRequestFromDashboard(songID, userID, sessionID));
    },
    undoRequest: (songID, userID, sessionID) => {
      dispatch(undoRequest(songID, userID, sessionID))
    },
    deleteNotifications: () => {
      dispatch(deleteNotifications());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongRequestSummary)