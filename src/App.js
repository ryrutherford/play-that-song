import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import About from './components/dashboard/About';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import RequestSong from './components/songRequests/RequestSong';
import Sessions from './components/sessions/Sessions';
import ActiveSession from './components/sessions/ActiveSession';

class App extends Component {

  render (){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Sessions}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/sessions" component={Sessions}></Route>
            <Route exact path="/activeSession/:session_id" component={ActiveSession}></Route>
            <Route path="/activeSession/:session_id/createSR" component={RequestSong}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
