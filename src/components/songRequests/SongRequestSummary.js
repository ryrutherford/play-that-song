import React from 'react';

const SongRequestSummary = ({song}) => {
  return (
    <div className="song-with-album card" id={song.id} key={song.id}>
      <img src={song.albumIMGURL} alt="Album Cover"/>
      <div className="card-content">
        <span className="card-title green-text">{song.title}</span>
        <p className="grey-text">{"Song • " + song.artists.join(", ")}</p>
        <p className="green-text"><a target="_blank" rel="noreferrer noopener" href={song.externalURL}>Play On Spotify</a></p>
      </div>
    </div>
  );
}

export default SongRequestSummary