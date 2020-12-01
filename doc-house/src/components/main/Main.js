import React from 'react';
import {Router,withRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import HomePage from '../general/HomePage';
import LoginPageUser from '../user/LoginPageUser';
import LoginPageDoctor from '../doctor/LoginPageDoctor';
import LogTransition from '../general/LogTransition';
import DoctorDashboard from '../doctor/DoctorDashboard';
import UserDashboard from '../user/UserDashboard';
import UserProfile from '../user/UserProfile';
import DoctorProfile from '../doctor/DoctorProfile';
import SignUpPageUser from '../user/SignUpPageUser';
import SignUpPageDoctor from '../doctor/SignUpPageDoctor';
import NotFound from '../general/NotFound';
import SearchDoctor from '../general/SearchDoctor';
import ViewProfile from '../general/ViewProfile';
import ChatApp from '../chat/ChatApp';

export const history = createBrowserHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/user-dashboard" component={UserDashboard}/>
    <Route path="/doctor-dashboard" component={DoctorDashboard}/>
    <Route path="/log-transition" component={LogTransition}/>
    <Route path="/signup-user" component={SignUpPageUser}/>
    <Route path="/signup-doctor" component={SignUpPageDoctor}/>
    <Route path="/login-user" component={LoginPageUser}/>
    <Route path="/login-doctor" component={LoginPageDoctor}/>
    <Route path="/user-profile" component={UserProfile}/>
    <Route path="/doctor-profile" component={DoctorProfile}/>
    <Route path="/profile/:id" component={ViewProfile}/>
    <Route path="/search-doctor" component={SearchDoctor}/>
    <Route exact path="/chat" render={(props) => <ChatApp {...props} />} />
    <Route path="/chat/rooms/:roomId" render={(props) => <ChatApp {...props} />} />
    <Route component={NotFound}/>
  </Switch>
)

export const AppWithRouter = withRouter(Root)

const Main = () => (
  <Router history={history}>
    <AppWithRouter/>
  </Router>
)

export default Main;