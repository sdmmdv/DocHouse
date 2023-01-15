import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './HomePageBody';
import Footer from './Footer';


class HomePage extends Component {
    render() { 
        return ( 
            <div>
                <Navbar/>
                <Header/>
                <Footer/>
            </div>
        );
    }
}
 
export default HomePage;