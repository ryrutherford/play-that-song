export const createSession = (userID, sessionID) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
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

//action for deleting the session
export const deleteSession = (sessionID) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    sessionID = parseInt(sessionID, 10);
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