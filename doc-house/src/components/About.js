import React, { Component } from 'react';
import {Button, Menu, MenuItem, IconButton, FontIcon, AccessibleFakeButton, IconSeparator, Avatar} from 'react-mdl';
import { Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import '../App.css';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div><h1>About Page</h1></div>
         );
    }
}
 
export default About;