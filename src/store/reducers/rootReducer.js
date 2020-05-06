import authReducer from './authReducer';
import songReducer from './songReducer';
import sessionReducer from './sessionReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

/*
* authReducer: reducer for authentication actions
* songReducer: reducer for song request actions
* sessionReducer: reducer for session actions
* firestoreReducer: reducer for firestore actions
* firebaseReducer: reducer for firebase actions
*/
const rootReducer = combineReducers({
  auth: authReducer,
  song: songReducer,
  session: sessionReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer