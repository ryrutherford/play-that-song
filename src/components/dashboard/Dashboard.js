import React, {Component} from 'react';
import Notifications from './Notifications';
import SongRequestList from '../songRequests/SongRequestList';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class Dashboard extends Component {
  render() {
    //console.log(this.props);
    const {songs} = this.props;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <SongRequestList songs={songs}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    songs: state.firestore.ordered.songRequests
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'songRequests'}
  ])
)(Dashboard)