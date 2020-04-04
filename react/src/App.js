
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';


import List from './pages/list';
import Add from './pages/add';
import Edit from './pages/edit';
import Crud from './pages/crud';

class App extends Component {
  render() {
    return (
    <Router>
    <div className="container">
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Link to={'/'} className="navbar-brand"><h1 className="App-title">People Management System</h1></Link>
    </header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/crud'} className="nav-link">One Page CRUD Operation</Link>
              </li>
          </ul>
        </div>
      </nav> <br/>
      <Switch>
          <Route exact path='/' component={ List } />
          <Route exact path='/add' component={ Add } />
          <Route exact path='/edit/:id' component={ Edit } />
          <Route exact path='/crud' component={ Crud } />
      </Switch>
    </div>
    </Router>
    );
  }
}

export default App;