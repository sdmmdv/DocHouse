import React, { Component } from 'react';
import Navbar from './Navbar';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <h1>Contact Page</h1>
            </div>
         );
    }
}
 
export default Contact;