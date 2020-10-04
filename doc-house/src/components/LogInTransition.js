import React, { Component } from 'react';
import {Switch, Route, Link} from "react-router-dom";

class LogInTransition extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Account options</h3>
                <Link to="/register-patient"style={{ textDecoration: 'none' }}><input type="submit" value="Register as a patient"/></Link>
                <Link to="/register-doctor"style={{ textDecoration: 'none' }}><input type="submit" value="Register as a doctor"/></Link>
                <Link to="/login"style={{ textDecoration: 'none' }}><input type="submit" value="Login"/></Link>
            </div>
        </div>
         );
    }
}
 
export default LogInTransition;