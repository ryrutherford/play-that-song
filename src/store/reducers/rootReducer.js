import authReducer from './authReducer';
import songReducer from './songReducer';
import sessionReducer from './sessionReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  song: songReducer,
  session: sessionReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer