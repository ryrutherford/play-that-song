export const createSession = (userID, sessionID) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()
    console.log("session id in action", sessionID)
    firestore.collection('songRequestSessions').add({
      creatorID: userID,
      session: {
        sessionID: sessionID,
        songRequests: []
      }
    })
    .then(() => {
      console.log("session created");
      dispatch({type: "SESSION_CREATED"});
    })
    .catch((error) => {
      console.log("session create error");
      dispatch({type:"SESSION_CREATED_ERROR"});
    })
  }
}