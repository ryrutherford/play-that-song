import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/dashboard/About';
import SongDetails from './components/songRequests/SongDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateSongRequest from './components/songRequests/CreateSongRequest';
import JoinSession from './components/sessions/JoinSession';
import Sessions from './components/sessions/Sessions';
import ActiveSession from './components/sessions/ActiveSession';

class App extends Component {

  render (){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/song/:id" component={SongDetails}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/newSR" component={CreateSongRequest}></Route>
            <Route path="/joinSession" component={JoinSession}></Route>
            <Route path="/sessions" component={Sessions}></Route>
            <Route path="/activeSession/:session_id" component={ActiveSession}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
