import React from 'react';
import SongRequestSummary from './SongRequestSummary';

//functional component that displays a list of song requests ordered by number of requests
const SongRequestList = ({songs, sessionID, creatorID}) => {
  return (
    <div className="sr-list section">
      {/* If there are song requests: 
      * - we sort the list of songs by number of requests (desc order)
      * - return a SongRequestSummary for each one 
      * Otherwise => we display a message indicating that there are no song requests yet
      */}
      <h3 className="card-title green-text">Song Requests</h3>
        {songs ? songs.slice().sort(function(a, b){return b.numRequests - a.numRequests}).map(song => {
          return (
            <SongRequestSummary sessionID={sessionID} creatorID={creatorID} song={song} key={sessionID}/>
          );
        }) : (
          <h6 className="black-text"><i>No song requests</i></h6>
        )}
    </div>
  );
}

export default SongRequestList