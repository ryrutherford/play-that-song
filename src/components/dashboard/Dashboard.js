import React, {Component} from 'react';
import Notifications from './Notifications';
import SongRequestList from '../songRequests/SongRequestList';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
  render() {
    //console.log(this.props);
    const {songs, auth, notifications} = this.props;
    if(!auth.uid) {
      return <Redirect to='/about'/>
    }
    
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <SongRequestList songs={songs}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    songs: state.firestore.ordered.songRequests,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'songRequests', orderBy: ['numRequests', 'desc']},
    {collection: 'notifications', limit: 10, orderBy: ['time', 'desc']}
  ])
)(Dashboard)