import React, { Component } from 'react';
import {connect} from 'react-redux';
import {undoRequest, createSongRequestFromDashboard, deleteNotifications} from '../../store/actions/songActions';

class SongRequestSummary extends Component {
  handleClickUndo = (e) => {
    e.preventDefault();
    this.props.undoRequest(e.target.id, this.props.auth.uid); //first param is the songID, second is the user id
  }
  handleClickRequest = (e) => {
    e.preventDefault();
    this.props.createSongRequestFromDashboard(e.target.id, this.props.auth.uid);
    this.props.deleteNotifications();
  }
  render(){
    const {auth, song} = this.props;
    return (
      <div className="song-with-album card" id={song.id} key={song.id}>
      <img src={song.albumIMGURL} alt="Album Cover"/>
      <div className="card-content">
        <span className="card-title green-text">
        <a target="_blank" rel="noreferrer noopener" title="Play on Spotify" href={song.externalURL} className="green-text">{song.title}</a>
        </span>
        <p className="black-text">{"Song • " + song.artists.join(", ")}</p>
        <p className="black-text">
          <b>{song.numRequests === 1 ? (song.numRequests + " Request") : (song.numRequests + " Requests")}</b>
        </p>
        {song.requestors.includes(auth.uid) ? (
            <button onClick={this.handleClickUndo} id={song.songID} className="btn green lighten-1 z-depth-0">Undo Request</button>
          ) : (
            <button onClick={this.handleClickRequest} id={song.songID} className="btn green lighten-1 z-depth-0">Request Song</button> 
          )
        }
      </div>
    </div>
    );
  }
}


/*
const SongRequestSummary = ({auth, song}) => {
  return (
    <div className="song-with-album card" id={song.id} key={song.id}>
      <img src={song.albumIMGURL} alt="Album Cover"/>
      <div className="card-content">
        <span className="card-title green-text">
        <a target="_blank" rel="noreferrer noopener" title="Play on Spotify" href={song.externalURL} className="green-text">{song.title}</a>
        </span>
        <p className="black-text">{"Song • " + song.artists.join(", ")}</p>
        <p className="black-text"><b>{song.numRequests === 1 ? (song.numRequests + " Request") : (song.numRequests + " Requests")}</b></p>
        {song.requestors.includes(auth.uid) ? (
          <button onClick={handleClick} id={song.id} className="btn green lighten-1 z-depth-0">Undo Request</button>
        ) :
        null}
      </div>
    </div>
  );
}*/

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSongRequestFromDashboard: (songID, userID) => {
      dispatch(createSongRequestFromDashboard(songID, userID));
    },
    undoRequest: (songID, userID) => {
      dispatch(undoRequest(songID, userID))
    },
    deleteNotifications: () => {
      dispatch(deleteNotifications());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongRequestSummary)