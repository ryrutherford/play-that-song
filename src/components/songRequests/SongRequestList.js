import React from 'react';
import SongRequestSummary from './SongRequestSummary';
const SongRequestList = () => {
  return (
    <div className="sr-list section">
      <SongRequestSummary/>
      <SongRequestSummary/>
      <SongRequestSummary/>
      <SongRequestSummary/>
    </div>
  );
}

export default SongRequestList