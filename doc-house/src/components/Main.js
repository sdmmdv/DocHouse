import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import LogIn from './LogIn';
import HomePage from './Homepage';
import Register from './Register';


const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact} />
    <Route path="/projects" component={Projects}/>
    <Route path="/login" component={LogIn}/>
    <Route path="/register" component={Register}/>
  </Switch>
)

export default Main;