import React, { Component } from 'react';
import SPOTIFY from 'C:/Users/Ry Rutherford/Documents/JavaScript Projects/Dev/play-that-song/src/img/spotify.png';
import {createSongRequest, clearError} from '../../store/actions/songActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreateSongRequest extends Component {
  state = {
    songs: []
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
    e.preventDefault();
    const songID = e.target.parentNode.parentNode.parentNode.id; //songID can be used to add a track to the request area
    document.getElementById('query').value='';
    //selecting the song that was requested by the user based on its ID
    const songSelected = this.state.songs.filter(song => song.id === songID);
    this.props.createSongRequest({songs: songSelected}, this.props.history);
    this.setState({
      songs: []
    });
  }

  render() {
    const {auth, reqError} = this.props;
    if (!auth.uid){
      return <Redirect to="/signin"/>
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
              <p className="grey-text">{"Song • " + song.artists.map(artist => artist.name).join(", ")}</p>
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
    ) : (null)
    return (
      <div className="container">
        <form className="white">
          <h5 className="grey-text text-darken-3">Search Songs</h5>
          <div className="input-field green-text">
            <input type="text" id="query" onChange={this.handleChange} placeholder="Search by song name to display results"/>
          </div>
          {songList}
        </form>
        {reqError ? 
        (<div className="msg-container">
          <div className="msg msg-error z-depth-3 scale-transition center">
            <p>{reqError}</p>
            <button onClick={this.props.clearError} className="btn white lighten-1 z-depth-0">OK</button>
          </div>
         </div>) : (null)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    reqError: state.song.reqError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSongRequest: (songs, history) => {
      console.log(songs)
      dispatch(createSongRequest(songs, history));
    },
    clearError: () => {
      dispatch(clearError());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSongRequest)
