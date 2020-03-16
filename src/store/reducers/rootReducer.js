import authReducer from './authReducer';
import songReducer from './songReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  song: songReducer,
  firestore: firestoreReducer
});

export default rootReducer