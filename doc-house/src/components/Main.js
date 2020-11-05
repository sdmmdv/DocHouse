import React from 'react';
import {Router,withRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import LoginPageUser from './LoginPageUser';
import LoginPageDoctor from './LoginPageDoctor';
import LogTransition from './LogTransition';
import DoctorDashboard from './DoctorDashboard';
import UserDashboard from './UserDashboard';
import UserProfile from './UserProfile';
import DoctorProfile from './DoctorProfile';
import SignUpPageUser from './SignUpPageUser';
import SignUpPageDoctor from './SignUpPageDoctor';
import NotFound404 from './NotFound';
import SearchDoctor from './SearchDoctor';
import ViewProfile from './ViewProfile';
import ChatApp from '../ChatApp';
import Test from './Test';

export const history = createBrowserHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={About}/>
    <Route exact path="/test" component={Test}/>
    <Route path="/user-dashboard" component={UserDashboard}/>
    <Route path="/doctor-dashboard" component={DoctorDashboard}/>
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
    <Route path="/profile/:id" component={ViewProfile}/>
    <Route path="/search-doctor" component={SearchDoctor}/>
    <Route path="/chat" component={ChatApp}/>
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