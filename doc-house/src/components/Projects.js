import React, { Component } from 'react';
import Navbar from './Navbar';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <h1>Projects Page</h1>
            </div>
         );
    }
}
 
export default Projects;