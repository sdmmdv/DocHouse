import React, { Component } from 'react';
import Navbar from './Navbar';

class HomePage extends Component {
    render() { 
        return ( 
            <div>
                <Navbar/>
                <h1>
                    Home Page
                </h1>
            </div>
         );
    }
}
 
export default HomePage;