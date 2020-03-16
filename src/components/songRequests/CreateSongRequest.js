import React, { Component } from 'react';
import SPOTIFY from 'C:/Users/Ry Rutherford/Documents/JavaScript Projects/Dev/play-that-song/src/img/spotify.png';
import {createSongRequest} from '../../store/actions/songActions';
import {connect} from 'react-redux';

class CreateSongRequest extends Component {
  state = {
    songs: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
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
    console.log(e.target.value);
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
            console.log(body.tracks.items);
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
    console.log(songSelected);
    this.setState({
      songs: songSelected
    })
    this.props.createSongRequest(this.state);
  }

  render() {
    const songs = this.state.songs;
    const songList = songs.length ? (
      songs.map((song) => {
        return (
          <div className="song card" id={song.id} key={song.id}>
            <img src={SPOTIFY} alt="SPOTIFY LOGO"/>
            <div className="card-content">
              <span className="card-title green-text">{song.name}</span>
              <p className="grey-text">{"Song • " + song.artists.map(artist => artist.name).join(", ")}</p>
              <p className="green-text"><a target="_blank" rel="noreferrer noopener" href={song.external_urls.spotify}>Play On Spotify</a></p>
              <div className="input-field">
                <button onClick={this.handleClick} className="btn green lighten-1 z-depth-0">Request Song</button>
              </div>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">Search by song name to display results</div>
    )
    return (
      <div className="container">
        <form className="white">
          <h5 className="grey-text text-darken-3">Search Songs</h5>
          <div className="input-field green-text">
            <label htmlFor="query">Song Title</label>
            <input type="text" id="query" onChange={this.handleChange}/>
          </div>
          {songList}
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSongRequest: (songs) => {
      dispatch(createSongRequest(songs));
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateSongRequest)
