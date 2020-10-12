import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import LoginPageUser from './LoginPageUser';
import LoginPageDoctor from './LoginPageDoctor';
import LogTransition from './LogTransition';
import HomePage from './Homepage';
import UserProfile from './UserProfile';
import SignUpPageUser from './SignUpPageUser';
import SignUpPageDoctor from './SignUpPageDoctor';

const Main = () => (
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
  </Switch>
)

export default Main;