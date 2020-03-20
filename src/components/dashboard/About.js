import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-content break-line">
          <p className="card-title green-text"><b>What is <i>Play That Song</i>?</b></p>
          <p className="black-text">
            <i>Play That Song</i> is a website that allows users to create "Song Request Sessions"
            where they can share a unique code that allows other users to add song requests to the session.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content about">
          <p className="card-title green-text"><b>How does it work?</b></p>
          <p className="black-text">
            Song requests are made by using the built in search functionality, integrated with the Spotify API
            to return live search results.
            <br/><br/>
            You must <u><b><Link to='/signup' className="green-text">create an account</Link></b></u> before you can use the app.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content about">
          <p className="card-title green-text"><b>What can I do with it?</b></p>
          <p className="black-text">
            Users are allowed to request the same song at most once and can undo requests
            once they've requested a song.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content about">
          <p className="card-title green-text"><b>How was this made?</b></p>
          <p className="black-text">
            The code for this project can be found on <b><u><a href="https://github.com/ryrutherford/play-that-song" className="green-text">Github</a></u></b>.
            <br/><br/>
            The website was built using <b>ReactJS</b> with <b>Redux</b> as the central state manager, <b>Firebase</b> as the host, authentication manager, and cloud function manager, and <b>Firestore</b> as the database.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About