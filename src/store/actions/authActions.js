
//action creator for when a user attempts to sign in
export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    //using firebase to handle the sign in => dispatch an action based on success or failure
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'SIGNIN_SUCCESS'})
    }).catch((err) => {
      dispatch({type: 'SIGNIN_ERROR', err})
    })
  }
}

//action creator for when a user attempts to sign out
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    //using firebase to handle the sign out => dispatch an action based on success or failure
    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'})
    }).catch( (err) => {
      dispatch({type: 'SIGNOUT_ERROR'})
    })
  }
}

//action creator to handle new user sign up
export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    
    //using firebase to create a new user => upon success create a new user record in the Users collection in firestore
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
      return firestore.collection('users').doc(response.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      }).then(() => {
        dispatch({type: 'SIGNUP_SUCCESS'})
      }).catch((err) => {
        dispatch({type: 'SIGNUP_ERROR', err})
      })
    }).catch((err) => {
      dispatch({type: 'SIGNUP_ERROR', err})
    })
  }
}