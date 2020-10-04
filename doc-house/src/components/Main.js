import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import LogIn from './LogIn';
import LogInTransition from './LogInTransition';
import HomePage from './Homepage';
import RegisterPatient from './RegisterPatient';
import RegisterDoctor from './RegisterDoctor';
import UserProfile from './UserProfile';


const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact} />
    <Route path="/projects" component={Projects}/>
    <Route path="/login-transition" component={LogInTransition}/>
    <Route path="/register-patient" component={RegisterPatient}/>
    <Route path="/register-doctor" component={RegisterDoctor}/>
    <Route path="/login" component={LogIn}/>
    <Route path="/user-profile" component={UserProfile}/>
  </Switch>
)

export default Main;