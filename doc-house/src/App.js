import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
        <LogIn />
        <hr>
        </hr>
        <Register />
    </div>
  );
}

export default App;
