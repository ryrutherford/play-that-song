import React from 'react';

const SongRequestSummary = ({song}) => {
  return (
    <div className="song-with-album card" id={song.id} key={song.id}>
      <img src={song.albumIMGURL} alt="Album Cover"/>
      <div className="card-content">
        <span className="card-title green-text">
        <a target="_blank" rel="noreferrer noopener" href={song.externalURL} className="green-text">{song.title}</a>
        </span>
        <p className="grey-text">{"Song • " + song.artists.join(", ")}</p>
         <p className="grey-text"><b>{song.numRequests === 1 ? (song.numRequests + " Request") : (song.numRequests + " Requests")}</b></p>
      </div>
    </div>
  );
}

export default SongRequestSummary