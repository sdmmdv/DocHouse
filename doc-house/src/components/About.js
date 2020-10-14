import React, { Component } from 'react';
import Navbar from './Navbar';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <h1>
                    About Page
                </h1>
            </div>
         );
    }
}
 
export default About;