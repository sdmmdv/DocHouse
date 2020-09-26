import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import DoctorProfile from './components/DoctorProfile';
import { Link, BrowserRouter as Router, Switch, Route,} from "react-router-dom";


function App() {
  return (
    <Router>
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
      

      <Switch>
          <Route exact path='/' component={LogIn} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserProfile} />
          <Route path="/doctor" component={DoctorProfile} />
      </Switch>
    </Router>
  );
}

export default App;
