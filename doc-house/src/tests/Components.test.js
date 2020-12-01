import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import HomePage from '../components/general/HomePage';
import LoginPageUser from '../components/user/LoginPageUser';
import LoginPageDoctor from '../components/doctor/LoginPageDoctor';
import LogTransition from '../components/general/LogTransition';
import DoctorDashboard from '../components/doctor/DoctorDashboard';
import UserDashboard from '../components/user/UserDashboard';
import UserProfile from '../components/user/UserProfile';
import DoctorProfile from '../components/doctor/DoctorProfile';
import SignUpPageUser from '../components/user/SignUpPageUser';
import SignUpPageDoctor from '../components/doctor/SignUpPageDoctor';
import NotFound from '../components/general/NotFound';
import SearchDoctor from '../components/general/SearchDoctor';
import ViewProfile from '../components/general/ViewProfile';
import Main from '../components/main/Main';
import ChatApp from '../components/chat/ChatApp';


describe('Analyse if components render without crashing', () => {

      it("renders App component", () => {
        shallow(<App />);
      });

      it("renders Main component", () => {
        shallow(<Main />);
      });

      it("renders HomePage component", () => {
        shallow(<HomePage />);
      });

      it("renders UserDashboard component", () => {
        shallow(<UserDashboard />);
      });

      it("renders DoctorDashboard component", () => {
        shallow(<DoctorDashboard />);
      });

      it("renders LogTransition component", () => {
        shallow(<LogTransition />);
      });

      it("renders SignUpPageUser component", () => {
        shallow(<SignUpPageUser />);
      });

      it("renders SignUpPageDoctor component", () => {
        shallow(<SignUpPageDoctor />);
      });

      it("renders Main component", () => {
        shallow(<LoginPageUser />);
      });

      it("renders ChatApp component", () => {
        shallow(<ChatApp />);
      });

      it("renders LoginPageDoctor component", () => {
        shallow(<LoginPageDoctor />);
      });

      it("renders SignUpPageDoctor component", () => {
        shallow(<SignUpPageDoctor />);
      });

      it("renders NotFound component", () => {
        shallow(<NotFound />);
      });

      it("renders UserProfile component", () => {
        shallow(<UserProfile />);
      });

      it("renders DoctorProfile component", () => {
        shallow(<DoctorProfile />);
      });

      it("renders ViewProfile component", () => {
        shallow(<ViewProfile />);
      });

      it("renders SearchDoctor component", () => {
        shallow(<SearchDoctor />);
      });

});



