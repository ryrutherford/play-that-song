import authReducer from './authReducer';
import songReducer from './songReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  song: songReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer