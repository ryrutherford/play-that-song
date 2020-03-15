import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SongDetails from './components/songRequests/SongDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateSongRequest from './components/songRequests/CreateSongRequest';

class App extends Component {

  render (){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/song/:id" component={SongDetails}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/newSR" component={CreateSongRequest}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
