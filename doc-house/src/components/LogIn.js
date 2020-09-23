import React, { Component } from 'react';

class LogIn extends Component {
    render(){
        return (
            <form>
                <h3>Sign in</h3>

                <div className = "form-group">
                    <label>
                        E-mail address
                    </label>
                    <input type="email" className="form-control" placeholder="e-mail"/>
                </div>

                <div className = "form-group">
                    <label>
                        Password
                    </label>
                    <input type="password" className="form-control" placeholder="password"/>
                </div>

                <button className="btn btn-primary btn-block" type="submit">Login</button>
                
            </form>
        );
    }
}

export default LogIn;