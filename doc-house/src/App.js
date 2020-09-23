import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import { Link, BrowserRouter, Switch, Route,} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/login"}>Dochouse</Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Sign up</Link>
              </li>
            </ul>
        </div>
      </nav>

      <div className="App">
          <div className="auth-wrapper">
              <div className = "auth-inner">
                <Switch>
                  <Route exact path='/' component={LogIn} />
                  <Route path="/login" component={LogIn} />
                  <Route path="/register" component={Register} />
                </Switch>
              </div>
          </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
