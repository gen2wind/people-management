
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';


import List from './pages/list';
import Add from './pages/add';
import Edit from './pages/edit';
import Crud from './pages/crud';

class App extends Component {
  render() {
    return (
    <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <button className="navbar-toggler sideMenuToggler" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link to={'/'} className="navbar-brand"><h4 className="App-title">People Management System</h4></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to={'/'} className="nav-link text-white">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/crud'} className="nav-link text-white">One Page CRUD Operation</Link>
              </li>
          </ul>
      </div>
    </nav>


    <main>
    <div className="wrapper p-5 my-4 mx-auto shadow rounded bg-white"> <br/>
      <Switch>
          <Route exact path='/' component={ List } />
          <Route exact path='/add' component={ Add } />
          <Route exact path='/edit/:id' component={ Edit } />
          <Route exact path='/crud' component={ Crud } />
      </Switch>
    </div>
        <Footer />
    </main>
    </Router>
    );
  }
}

export default App;