import React from 'react';
import SongRequestSummary from './SongRequestSummary';
const SongRequestList = ({songs}) => {
  return (
    <div className="sr-list section">
      <h3 className="card-title green-text">Song Requests</h3>
        {songs ? songs/*.slice().sort(function(a, b){return b.numRequests - a.numRequests})*/.map(song => {
          return (
            <SongRequestSummary song={song} key={song.id}/>
          );
        }) : (
          <h6 className="black-text"><i>No song requests</i></h6>
        )}
    </div>
  );
}

export default SongRequestList