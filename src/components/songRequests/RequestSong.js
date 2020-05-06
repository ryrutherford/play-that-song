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

  //checks whether the url entered is valid (i.e. session_id param in url corresponds to a valid session)
  isValidURL = () => {
    /*
    * songRequestSessions contains data corresponding to all active sessions
    * sessionID corresponds to the sessionID entered (i.e. the sessionID in the URL)
    */
    const {songRequestSessions, sessionID} = this.props;

    let sessionExists = false;
    //once the songRequestSessions are loaded we can check whether the sessionID exists or not
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

  //event handler that manages Spotify API authorization and fetches song data using the Spotify API Search Endpoint
  //the song data is fetched based on what is typed into the form field by the user
  handleChange = (e) => {
    //e.target.id will always = "query" in this function
    //after something is typed in the form field, query is updated with the value that was typed
    this.setState({
      [e.target.id]: e.target.value,
    });

    //SPOTIFY API AUTHORIZATION AND SEARCH ENDPOINT REQUEST
    let request = require('request'); // "Request" library

    let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    let client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
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

    //using the input of the user to search spotify for matching songs
    if(e.target.value){
      //authorizing the request
      request.post(authOptions, (error, response, body) => {
        //if authorization succeeded then we can search for songs
        if (!error && response.statusCode === 200) {

          // use the access token to access the Spotify Web API
          var token = body.access_token;

          //I decided to only return 5 results but could return more
          var options = {
            url: 'https://api.spotify.com/v1/search?limit=5&q=' + encodeURIComponent(this.state.query) + '&type=track',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };

          //getting the top 5 search results from Spotify for the value entered by the user
          //once the results are retrieved we update the songs array in the state with the relevant data
          request.get(options, (error, response, body) => {
            this.setState({
              songs: body.tracks.items
            })
          });
        }
      });
    }
  }

  //click handler that is called when a user wants to request a particular song
  handleClick = (e) => {
    /*
    * requestSong: action creator that will attempt to request the selected song for the current user
    * deleteNotifications: actionCreator that will delete notifications once the notifications collection has > 500 documents
    * sessionID: the current sessionID, needed for the requestSong function
    */
    const {requestSong, deleteNotifications, sessionID} = this.props;

    e.preventDefault();

    //the songID is used to select a song from the songs array in state
    const songID = e.target.parentNode.parentNode.parentNode.id;

    //resetting the value entered by the user to the empty string
    document.getElementById('query').value='';

    //selecting the song that was requested by the user based on its ID
    const songSelected = this.state.songs.filter(song => song.id === songID);

    //calling the requestSong action creator with the songSelected, sessionID, and history as params
    //the history is used to redirect the user after the request is complete
    requestSong({songs: songSelected}, this.props.history, sessionID);

    //deleteNotifications is called everytime a song is requested but will only do anything when there are more than 500 notifications
    deleteNotifications();

    //updating the state to reflect the attempted (successful or unsuccessful) request
    this.setState({
      songs: []
    });
  }

  render() {
    /*
    * songRequestSessions contains data corresponding to all active sessions
    * auth contains user data (UID)
    * reqError contains request error data (i.e. if the user tried to a request a song they've already requested)
    */
    const {auth, reqError, songRequestSessions} = this.props;

    //if auth.uid is undefined then we will redirect the user to the sign in page
    if (!auth.uid){
      return <Redirect to="/signin"/>
    }

    //if the songRequestSessions are loaded then we can check if the url (sessio_id) is valid
    //if the url is not valid (session with session_id doesn't exist) then we redirect the user to the sessions page
    if(isLoaded(songRequestSessions) && this.isValidURL() === false){
      return <Redirect to='/sessions'/>
    }

    //the songs returned by the Spotify API
    const songs = this.state.songs;

    //if there are any songs returned then we map each song in the songs array to a jsx card and assign it to songList
    //otherwise songList is null
    //the resulting songList is displayed in the returned jsx
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
        {/* If there is a request error (i.e. requesting a song you've already requested) we display a pop up error*/}
        {reqError ? 
        (<div className="msg-container">
          <div className="msg msg-error z-depth-3 scale-transition center">
            <p>{reqError}</p>
            {/* When the user acknowledges the error, we use the clearError action creator to remove the error */}
            <button onClick={this.props.clearError} className="btn white red-text lighten-1 z-depth-0">OK</button>
          </div>
         </div>) : (null)}
      </div>
    )
  }
}

//selecting the auth data from firebase, reqErro from the store, and songRequestSessions data from firestore
//the sessionId comes from the ownProps (the session_id field of the URL)
const mapStateToProps = (state, ownProps) => {
  let sessionID = ownProps.match.params.session_id;
  return {
    auth: state.firebase.auth,
    reqError: state.song.reqError,
    songRequestSessions: state.firestore.data.songRequestSessions,
    sessionID
  }
}

//mapping dispatch functions to props
const mapDispatchToProps = (dispatch) => {
  /*
  * requestSong: calls an action creator that will create/update a song request for the session (as long as the user hasn't already requested the song)
  * clearError: calls an action creator that will remove the reqError when a user attempts to request a song they've already requested
  * deleteNotifications: calls an action creator that will delete all notifications except for the 10 most recent ones once the number of notifications exceeds 500
  */
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
