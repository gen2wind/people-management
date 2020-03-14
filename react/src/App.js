
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';


import List from './components/list';
import Add from './components/add';
import Edit from './components/edit';

class App extends Component {
  render() {
    return (
    <Router>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={'/'} className="navbar-brand">Interview Answers</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={'/'} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/add'} className="nav-link">Create</Link>
            </li>
          </ul>
        </div>
      </nav> <br/>
      <h2>List of the People</h2> <br/>
      <Switch>
          <Route exact path='/' component={ List } />
          <Route exact path='/add' component={ Add } />
          <Route exact path='/edit/:id' component={ Edit } />
      </Switch>
    </div>
    </Router>
    );
  }
}

export default App;