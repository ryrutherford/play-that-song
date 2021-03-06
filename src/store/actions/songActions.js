export const requestSong = (songs, history, sessionID) => {
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
   let songIndex = null;
   let songRequests = null; //used to update the database with the new/updated sr

   //the first action is to get a document in the collection that has the same songID as the song that was requested
   firestore.collection('songRequestSessions').where("session.sessionID", "==", parseInt(sessionID)).get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {

         // doc.data() is never undefined for query doc snapshots
         let session = doc.data().session;
         docID = doc.id;

         //iterating through all the songRequests in the session to find the song request we're looking for
         songRequests = session.songRequests;
         songRequests.forEach((songRequest, index) => {
            if(songRequest.songID === song.id){
              songIndex = index; //used to identify which index in the songRequests array the song is
              numRequests = songRequest.numRequests + 1;
              requestors = songRequest.requestors;
              
              //if the requestors array includes the requestorID => the user can't request this song
              if (requestors.includes(requestorID)) alreadyRequested = true;
            }
         })
       });
     })
     //the next step is to either add a new songRequest to the session.songRequests array (song hasn't been requested yet) or update the numRequests of the existing songRequest
     .then(() => {
       //if the numRequests is 0 then the song hasn't been requested before, we must add a new song to the array
       if (numRequests === 0){
        numRequests = 1;
        //pushing the new song request to the songRequests array that is a copy of the songRequests in the session doc in firestore
        songRequests.push({
          title: song.name,
          artists: song.artists.map(artist => artist.name),
          externalURL: song.external_urls.spotify,
          songID: song.id,
          requestors: [...requestors, requestorID],
          albumIMGURL: song.album.images[0].url,
          numRequests
        })
        //updating the collection to reflect the change to the songRequests
        firestore.collection('songRequestSessions').doc(docID).update({
          "session.songRequests": songRequests
        })
        .then(() => {
           history.push("/activeSession/" + sessionID);
           dispatch({type: 'CREATE_SONG_REQUEST', songs});
         }).catch((error) => {
           dispatch({type: 'CREATE_SONG_REQUEST_ERROR', error});
         });
       }
       //if the numRequests is > 0 then the song has already been requested
       //and we must update the doc to reflect the new request as long as the user hasn't already requested the song
       else if (alreadyRequested === false){
         songRequests[songIndex].numRequests = numRequests;
         songRequests[songIndex].requestors = [...requestors, requestorID];
         firestore.collection('songRequestSessions').doc(docID).update({
           "session.songRequests": songRequests
         }).then(() => {
           history.push("/activeSession/" + sessionID);
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
     dispatch({type: 'SONG_REQUEST_ERROR', err});
   })
   .catch((err) => {
     dispatch({type: 'GET_DOCUMENT_ERROR', err});
   })
  }
}

//used to remove the error message from the request page
export const clearError = () => {
  return (dispatch, getState) => {
    dispatch({type: 'CLEAR_ERROR'});
  }
}

//deletes notifications from the notifications collection if there are more than 500 docs in the collection
export const deleteNotifications = () => {
  return (dispatch, getState, {getFirestore}) => {
    
    const firestore = getFirestore();

    //the notifications will be retrieved ordered in ascending order by data created
    firestore.collection('notifications').orderBy('time').get()
    .then((querySnapshot) => {
      let numNotifs = querySnapshot.size;

      //used to check if any notifs were deleted and as a counter for deleting notifs
      let i = 0;

      //if there are more than 500 notifications in the notifications collection we must:
      //delete the oldest notifications until only 5 remain
      if(numNotifs >= 500){
        querySnapshot.forEach((doc) => {
          if(i < numNotifs - 5){
            //deleting the documents
            firestore.collection('notifications').doc(doc.id).delete()
              .then(() => {
                dispatch({type: 'DELETE_NOTIF'});
              })
              .catch((err) => {
                dispatch({type:'DELETE_NOTIF_ERROR', err});
              })
            i++;
          }
        })
      }
      if(i !== 0) dispatch({type: 'DELETE_NOTIF'});
    })
    .catch((err) => {
      dispatch({type: 'DELETE_NOTIF_ERROR', err})
    })
  }
}

//used to undo a request for a song that a user has already requested
export const undoRequest = (songID, userID, sessionID) => {
  return (dispatch, getState, {getFirestore}) => {
    /*
      firestore: a constant that is connected to the firestore database
      numRequests: a variable that represents how many times the song has been requested
      docID: the id of the document that contains the requested song. It is initially null as the song may not have been requested already
      requestors: an array of all the users that have requested this song
      songIndex: the index of the song in the songRequests array in the songRequests array of the corresponding session
      songRequests: the list of songRequests for the sessions with sessionID = sessionID
    */
    const firestore = getFirestore();
    let numRequests = 0;
    let docID = null;
    let requestors = [];
    let songIndex = null;
    let songRequests = null;

    //getting the document corresponding the song request session with sessionID = sessionID
    firestore.collection('songRequestSessions').where("session.sessionID", "==", parseInt(sessionID)).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          
          //getting the session data
          let session = doc.data().session;
          docID = doc.id;

          //iterating through all the songRequests in the session to find the songRequest we're looking for
          songRequests = session.songRequests;
          songRequests.forEach((songRequest, index) => {
            if(songRequest.songID === songID){
              songIndex = index; //used to identify which index in the songRequests array the song is
              numRequests = songRequest.numRequests;
              requestors = songRequest.requestors;
            }
          })
        });
      })
      //the next step is to either remove the songRequest from the session.songRequests array (song has been requested once) or update the numRequests of the existing songRequest
      .then(() => {
        //if the numRequests is 1 then the song needs to be removed
        if (numRequests === 1){
        
          //removing the song request from the songRequests array that is a copy of the songRequests in the session doc in firestore
        songRequests.splice(songIndex,1);

        //updating the collection to reflect the change to the songRequests
        firestore.collection('songRequestSessions').doc(docID).update({
          "session.songRequests": songRequests
        })
        .then(() => {
            dispatch({type: 'UNDO_SONG_REQUEST'});
          }).catch((error) => {
            dispatch({type: 'UNDO_SONG_REQUEST_ERROR', error});
          });
        }
        //if the numRequests is > 1 then the song has already been requested
        //we must update the doc to reflect the undone request
        else{
          //updating the numRequests
          songRequests[songIndex].numRequests = numRequests - 1;

          //removing the requestor ID from the list of requestors
          songRequests[songIndex].requestors = requestors.filter(id => id !== userID);

          //updating the document with the new list of song requests
          firestore.collection('songRequestSessions').doc(docID).update({
            "session.songRequests": songRequests
          }).then(() => {
            dispatch({type: 'UNDO_SONG_REQUEST'});
          }).catch((error) => {
            dispatch({type: 'UNDO_SONG_REQUEST_ERROR', error});
          });
        }
      })
    .catch((error) => {
      dispatch({type: 'UNDO_SONG_REQUEST_ERROR', error});
    })
    .catch((error) => {
      dispatch({type: 'GET_DOCUMENT_ERROR', error});
    })
  }
}

//an action that will create a song request from the dashboard
export const createSongRequestFromDashboard = (songID, userID, sessionID) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    
    /*
      firestore: a constant that is connected to the firestore database
      numRequests: a variable that represents how many times the song has been requested
      docID: the id of the document that contains the requested song. It is initially null as the song may not have been requested already
      songIndex: the index of the song in the songRequests array in the songRequests array of the corresponding session
      songRequests: the list of songRequests for the sessions with sessionID = sessionID
    */
    const firestore = getFirestore();
    let numRequests = 0;
    let docID = null;
    let songIndex = null;
    let songRequests = null;

    //getting the document that corresponds to this sessionID
    firestore.collection('songRequestSessions').where("session.sessionID", "==", parseInt(sessionID)).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let session = doc.data().session;
          docID = doc.id;
          //iterating through all the songRequests in the session to find the songRequest we're looking for
          songRequests = session.songRequests;
          songRequests.forEach((songRequest, index) => {
            if(songRequest.songID === songID){
              songIndex = index;
              numRequests = songRequest.numRequests;
            }
          })
        });
      })
      //the next step is to update the numRequests of the existing songRequest
      .then(() => {
        //updating the numRequests
        songRequests[songIndex].numRequests = numRequests + 1;

        //adding the requestor ID from the list of requestors
        songRequests[songIndex].requestors.push(userID);

        //updating the document to reflect the new request
        firestore.collection('songRequestSessions').doc(docID).update({
          "session.songRequests": songRequests
        }).then(() => {
          dispatch({type: 'CREATE_SONG_REQUEST'});
        }).catch((error) => {
          dispatch({type: 'CREATE_SONG_REQUEST_ERROR', error});
        });
      })
    .catch((error) => {
      dispatch({type: 'CREATE_SONG_REQUEST_ERROR', error});
    })
    .catch((error) => {
      dispatch({type: 'GET_DOCUMENT_ERROR', error});
    })
    
  }
}