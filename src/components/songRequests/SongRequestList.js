import React from 'react';
import SongRequestSummary from './SongRequestSummary';
const SongRequestList = ({songs}) => {
  return (
    <div className="sr-list section">
      {songs && songs.slice().sort(function(a, b){return b.numRequests - a.numRequests}).map(song => {
        return (
          <SongRequestSummary song={song} key={song.id}/>
        );
      })}
    </div>
  );
}

export default SongRequestList