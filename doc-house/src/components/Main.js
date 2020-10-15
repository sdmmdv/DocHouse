import React from 'react';
import {Router,withRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import LoginPageUser from './LoginPageUser';
import LoginPageDoctor from './LoginPageDoctor';
import LogTransition from './LogTransition';
import HomePage from './Homepage';
import UserProfile from './UserProfile';
import DoctorProfile from './DoctorProfile';
import SignUpPageUser from './SignUpPageUser';
import SignUpPageDoctor from './SignUpPageDoctor';
import NotFound404 from './NotFound';

export const history = createBrowserHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact} />
    <Route path="/projects" component={Projects}/>
    <Route path="/log-transition" component={LogTransition}/>
    <Route path="/signup-user" component={SignUpPageUser}/>
    <Route path="/signup-doctor" component={SignUpPageDoctor}/>
    <Route path="/login-user" component={LoginPageUser}/>
    <Route path="/login-doctor" component={LoginPageDoctor}/>
    <Route path="/user-profile" component={UserProfile}/>
    <Route path="/doctor-profile" component={DoctorProfile}/>
    <Route component={NotFound404}/>
  </Switch>
)

const App = withRouter(Root)

const Main = () => (
  <Router history={history}>
    <App/>
  </Router>
)

export default Main;