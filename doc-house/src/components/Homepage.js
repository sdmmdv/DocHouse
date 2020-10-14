import React, {Component,useEffect, useState, useContext} from "react";
import Navbar from '../components/Navbar';

class HomePage extends Component {
    render() { 
        return (  
            <div><Navbar/>
                <h1>Home Page</h1>
            </div>
        );
    }
}
 
export default HomePage;