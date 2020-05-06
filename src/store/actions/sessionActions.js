//action creator that creates a new song request session based on the creatorID (userID) and randomly generated sessionID
export const createSession = (userID, sessionID) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    //adding the new session to firestore and dispatching a success, or failure action based on the result
    firestore.collection('songRequestSessions').add({
      creatorID: userID,
      session: {
        sessionID: sessionID,
        songRequests: []
      }
    })
    .then(() => {
      dispatch({type: "SESSION_CREATED"});
    })
    .catch((error) => {
      dispatch({type:"SESSION_CREATED_ERROR", error});
    })
  }
}

//action creator for deleting the session with corresponding sessionID
export const deleteSession = (sessionID) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    //the sessionID must be converted to an int because that's the way it is represented in firestore
    sessionID = parseInt(sessionID, 10);

    //deleting the session from firestore with the corresponding sessionID and dispatching a success/failur action based on the result
    firestore.collection('songRequestSessions').where("session.sessionID", "==", sessionID).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firestore.collection('songRequestSessions').doc(doc.id).delete().then(() => {
            dispatch({type:'DELETE_SESSION'});
          }).catch((error) => {
            dispatch({type:'DELETE_SESSION_ERROR', error});
          })
        })
      })
      .catch((error) => {
        dispatch({type:'DELETE_SESSION_ERROR', error});
      })
  }
}