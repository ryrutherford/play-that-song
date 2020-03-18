

export const createSongRequest = (songs, history) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {

    /*
      firestore: a constant that is connected to the firestore database
      song: a constant that represents the song that was requested by a user
      numRequests: a variable that represents how many times the song has been requested
      docID: the id of the document that contains the requested song. It is initially null as the song may not have been requested already
      requestorID: the id of the user that has just requested the song
      requestors: an array of all the users that have requested this song
      alreadyRequested: a boolean that indicates whether the user has already requested this song
    */

    const firestore = getFirestore();
    const song = songs.songs[0];
    let numRequests = 0;
    let docID = null;
    const requestorID = getState().firebase.auth.uid;
    let requestors = [];
    let alreadyRequested = false;

    //the first action is to get a document in the collection that has the same songID as the song that was requested
    firestore.collection('songRequests').where("songID", "==", song.id).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().songID === song.id){
            //console.log(doc.id, " => ", doc.data());
            docID = doc.id;
            numRequests = doc.data().numRequests + 1;
            requestors = doc.data().requestors;
            if (requestors.includes(requestorID)) alreadyRequested = true;
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
            requestors: [...requestors, requestorID],
            albumIMGURL: song.album.images[0].url,
            numRequests
          }).then(() => {
            history.push("/");
            dispatch({type: 'CREATE_SONG_REQUEST', songs});
          }).catch((err) => {
            dispatch({type: 'CREATE_SONG_REQUEST_ERROR', err});
          });
        }
        //if the numRequests is > 0 then the song has already been requested
        //and we must update the doc to reflect the new request as long as the user hasn't already requested the song
        else if (alreadyRequested === false){
          firestore.collection('songRequests').doc(docID).update({
            numRequests,
            requestors: [...requestors, requestorID]
          }).then(() => {
            history.push("/");
            dispatch({type: 'UPDATE_SONG_REQUEST', songs});
          }).catch((err) => {
            dispatch({type: 'UPDATE_SONG_REQUEST_ERROR', err});
          });
        }
        else {
          //we dispatch an action indicating the the song has already been requested
          let err = 'You have already requested this song.'
          dispatch({type: 'ALREADY_REQUESTED', err});
        }
      })
    .catch((err) => {
      console.log("song request error", err);
      dispatch({type: 'SONG_REQUEST_ERROR', err});
    })
    .catch((err) => {
      console.log("Error getting documents: ", err);
      dispatch({type: 'GET_DOCUMENT_ERROR', err});
    })
  };
};

export const clearError = () => {
  return (dispatch, getState) => {
    dispatch({type: 'CLEAR_ERROR'})
  }
}