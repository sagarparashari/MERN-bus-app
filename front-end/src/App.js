import React, { useEffect } from 'react';
import './App.css';
import SignIn from './component/SignIn/SignIn';
import Landing from './component/landing/Landing';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


function App() {
  useEffect(() => {
    return (
      console.log("refresh")
    )
  })
  return (
    <Router>

      <div className="content">
        <img alt='bg img' className="img-fluid" src={require('./busblur.png')} />
      </div>
      <div className="header">&nbsp;&nbsp;
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img className="img-fluid" alt="bg-img" src={require('./logo1.png')} />&nbsp;&nbsp;
          <h1 className="navbar-brand">Online Bus Ticketing Platform</h1>
        </nav>
      </div>
      <Switch>
        <Route path='/' exact render={props => <SignIn {...props} />} />
        <Route path='/landing' render={props => {

          if (sessionStorage.getItem('token')) {
            return (<Landing {...props} />)
          } else {
            return (<Redirect path='/' />)
          }
        }} />

      </Switch>
    </Router>


  );
}

export default App;
