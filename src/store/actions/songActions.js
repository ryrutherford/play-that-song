

export const createSongRequest = (songs) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {

    /*
      firestore: a constant that is connected to the firestore database
      song: a constant that represents the song that was requested by a user
      numRequests: a variable that represents how many times the song has been requested
      docID: the id of the document that contains the requested song. It is initially null as the song may not have been requested already
    */

    const firestore = getFirestore();
    const song = songs.songs[0];
    let numRequests = 0;
    let docID = null;

    //the first action is to get a document in the collection that has the same songID as the song that was requested
    firestore.collection('songRequests').where("songID", "==", song.id).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().songID === song.id){
            //console.log(doc.id, " => ", doc.data());
            docID = doc.id;
            numRequests = doc.data().numRequests + 1;
          }
        });
      })
      //the next step is to either add a new doc to the collection (song hasn't been requested yet) or update the numRequests of the existing doc
      .then(() => {
        //if the numRequests is 0 then the song hasn't been requested before, we must add a new song (doc) to firestore
        if (numRequests === 0){
          numRequests = 1;
          firestore.collection('songRequests').add({
            title: song.name,
            artists: song.artists.map(artist => artist.name),
            externalURL: song.external_urls.spotify,
            songID: song.id,
            requestorID: '1',
            albumIMGURL: song.album.images[0].url,
            numRequests //needs to update based on the number of requests this song has in the db
          }).then(() => {
            dispatch({type: 'CREATE_SONG_REQUEST', songs});
          }).catch((err) => {
            dispatch({type: 'CREATE_SONG_REQUEST_ERROR', err});
          });
        }
        //if the numRequests is > 0 then the song has already been requested and we must update the doc to reflect the new request
        else{
          firestore.collection('songRequests').doc(docID).update({
            numRequests
          }).then(() => {
            dispatch({type: 'UPDATE_SONG_REQUEST', songs});
          }).catch((err) => {
            dispatch({type: 'UPDATE_SONG_REQUEST_ERROR', err});
          });
        }
      })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  };
};