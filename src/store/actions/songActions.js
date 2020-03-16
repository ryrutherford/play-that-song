

export const createSongRequest = (songs) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //make async call to database
    const firestore = getFirestore();
    const song = songs.songs[0];
    firestore.collection('songRequests').add({
      title: song.name,
      artists: song.artists.map(artist => artist.name),
      externalURL: song.external_urls.spotify,
      songID: song.id,
      requestorID: '1',
      albumIMGURL: song.album.images[0].url,
      numRequests: 1 //needs to update based on the number of requests this song has in the db
    }).then(() => {
      dispatch({type: 'CREATE_SONG_REQUEST', songs});
    }).catch((err) => {
      dispatch({type: 'CREATE_SONG_REQUEST_ERROR', err});
    });
  };
};