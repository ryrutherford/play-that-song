import React, { Component } from 'react';
import SPOTIFY from 'C:/Users/Ry Rutherford/Documents/JavaScript Projects/Dev/play-that-song/src/img/spotify.png';
import {requestSong, clearError, deleteNotifications} from '../../store/actions/songActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';

class RequestSong extends Component {
  state = {
    songs: []
  }

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

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    let request = require('request'); // "Request" library

    let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Your client id
    let client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Your secret
    // your application requests authorization
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    if(e.target.value){
      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {

          // use the access token to access the Spotify Web API
          var token = body.access_token;
          var options = {
            url: 'https://api.spotify.com/v1/search?limit=5&q=' + encodeURIComponent(this.state.query) + '&type=track',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };
          request.get(options, (error, response, body) => {
            this.setState({
              songs: body.tracks.items
            })
          });
        }
      });
    }
  }

  handleClick = (e) => {
    const {requestSong, deleteNotifications, sessionID} = this.props;
    e.preventDefault();
    const songID = e.target.parentNode.parentNode.parentNode.id; //songID can be used to add a track to the request area
    document.getElementById('query').value='';
    //selecting the song that was requested by the user based on its ID
    const songSelected = this.state.songs.filter(song => song.id === songID);
    requestSong({songs: songSelected}, this.props.history, sessionID);
    deleteNotifications();
    this.setState({
      songs: []
    });
  }

  render() {
    const {auth, reqError, songRequestSessions} = this.props;
    if (!auth.uid){
      return <Redirect to="/signin"/>
    }
    if(isLoaded(songRequestSessions) && this.isValidURL() === false){
      return <Redirect to='/sessions'/>
    }
    const songs = this.state.songs;
    const songList = songs.length ? (
      songs.map((song) => {
        return (
          <div className="create-requests card" id={song.id} key={song.id}>
            <div className="song-with-album"><img src={song.album.images[0].url} alt="Album Cover"/></div>
            <div className="spotify"><img src={SPOTIFY} alt="Spotify Logo"/></div>
            <div className="card-content">
              <span className="card-title green-text">{song.name}</span>
              <p className="black-text">{"Song • " + song.artists.map(artist => artist.name).join(", ")}</p>
              <p className="green-text">
                <a target="_blank" rel="noreferrer noopener" title="Play on Spotify" href={song.external_urls.spotify}>Play On Spotify</a>
              </p>
              <div className="input-field">
                <button onClick={this.handleClick} className="btn green lighten-1 z-depth-0">Request Song</button>
              </div>
            </div>
          </div>
        )
      })
    ) : (null);
    return (
      <div className="container">
        <form className="white">
          <h5 className="black-text text-darken-3">Search Songs</h5>
          <div className="input-field green-text">
            <input type="text" id="query" onChange={this.handleChange} placeholder="Search by song name to display results"/>
          </div>
          {songList}
        </form>
        {reqError ? 
        (<div className="msg-container">
          <div className="msg msg-error z-depth-3 scale-transition center">
            <p>{reqError}</p>
            <button onClick={this.props.clearError} className="btn white red-text lighten-1 z-depth-0">OK</button>
          </div>
         </div>) : (null)}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let sessionID = ownProps.match.params.session_id;
  return {
    auth: state.firebase.auth,
    reqError: state.song.reqError,
    songRequestSessions: state.firestore.data.songRequestSessions,
    sessionID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSong: (songs, history, sessionID) => {
      dispatch(requestSong(songs, history, sessionID));
    },
    clearError: () => {
      dispatch(clearError());
    },
    deleteNotifications: () => {
      dispatch(deleteNotifications());
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{collection: 'songRequestSessions'}]))
  (RequestSong)
