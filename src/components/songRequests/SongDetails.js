import React from 'react'

const SongDetails = (props) => {
  const id = props.match.params.id;
  return (
    <div className="container section sr-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Song Title - {id}</span>
          <p>Artist</p>
        </div>
        <div className="card-action green-text lighten-4">
          <div>Ext Info</div>
          <div>Ext Info2</div>
        </div>
      </div>
    </div>
  )
}

export default SongDetails
