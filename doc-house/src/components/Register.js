import React, { Component } from 'react';

class Register extends Component {
    render(){
        return (
            <form>
                <h3>Sign up</h3>

                <div className = "registerForm">
                    <label>
                        First name
                    </label>
                    <input type="text" className="form-control" placeholder="e-mail"/>
                </div>

                <div className = "registerForm">
                    <label>
                        Last name
                    </label>
                    <input type="text" className="form-control" placeholder="e-mail"/>
                </div>

                <div className = "registerForm">
                    <label>
                        E-mail address
                    </label>
                    <input type="text" className="form-control" placeholder="e-mail"/>
                </div>

                <div className = "registerForm">
                    <label>
                        Password
                    </label>
                    <input type="password" className="form-control" placeholder="password"/>
                </div>

                <button type="submit">Register</button>
                
            </form>
        );
    }
}

export default Register;

