import React, { Component } from 'react';

class Register extends Component {
    render(){
        return (
            <form>
                <h3>Sign up</h3>

                <div className = "form-group">
                    <label>
                        First Name
                    </label>
                    <input type="text" className="form-control" placeholder="first name"/>
                </div>

                <div className = "form-group">
                    <label>
                        Last Name
                    </label>
                    <input type="text" className="form-control" placeholder="last name"/>
                </div>

                <div className = "form-group">
                    <label>
                        E-mail Address
                    </label>
                    <input type="text" className="form-control" placeholder="e-mail"/>
                </div>

                <div className = "form-group">
                    <label>
                        Password
                    </label>
                    <input type="password" className="form-control" placeholder="password"/>
                </div>

                <button className="btn btn-primary btn-block" type="submit">Register</button>
                
                
            </form>
        );
    }
}

export default Register;

