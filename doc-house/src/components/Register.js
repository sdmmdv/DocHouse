import React, { Component } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import _ from "lodash/fp";
import isEmail from "validator/lib/isEmail";

const Register = (props) => {

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        alert(JSON.stringify(data));
        axios.post('http://localhost:9000/users/add', data)
        .then(res => console.log(res.data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign up</h3>

            <div className = "form-group">
                <label>
                    First Name
                </label>
                <input type="text" className="form-control" 
                name="first_name"
                ref={register({
                    required: true,
                    minLength: 2,
                    pattern: /^[A-Za-z ,.']+$/i 
                })}
                placeholder="first name"/>
                {_.get("first_name.type", errors) === "required" && (
                    <p>This field is required!</p>
                )}
                {_.get("first_name.type", errors) === "minLength" && (
                    <p>Name must contain at least 2 characters!</p>
                )}
                {_.get("first_name.type", errors) === "pattern" && (
                    <p>Wrong name format!</p>
                )}
            </div>

            <div className = "form-group">
                <label>
                    Last Name
                </label>
                <input type="text" className="form-control"
                    name="last_name"
                    ref={register({
                        required: true,
                        minLength: 2,
                        pattern: /^[A-Za-z ,.']+$/i 
                    })}
                    placeholder="last name"/>
                    {_.get("last_name.type", errors) === "required" && (
                        <p>This field is required!</p>
                    )}
                    {_.get("last_name.type", errors) === "minLength" && (
                        <p>Name must contain at least 2 characters!</p>
                    )}
                    {_.get("last_name.type", errors) === "pattern" && (
                        <p>Wrong name format!</p>
                    )}
            </div>

            <div className = "form-group">
                <label>
                    E-mail Address
                </label>
                <input type="text" className="form-control"
                    name="email"
                    ref={register({
                    required: true,
                    pattern: /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/i,
                    })}
                    placeholder="e-mail"
                />
                {_.get("email.type", errors) === "required" && (
                        <p>This field is required!</p>
                )}
                {_.get("email.type", errors) === "pattern" && (
                        <p>Wrong email format!</p>
                )}
            </div>

            <div className = "form-group">
                <label>
                    Password
                </label>
                <input type="password" className="form-control"
                    name="password"
                    ref={register({
                        required: true,
                        minLength: 6,
                    })}
                    placeholder="password" />
                    {_.get("password.type", errors) === "required" && (
                        <p>This field is required</p>
                    )}
                    {_.get("password.type", errors) === "minLength" && (
                        <p>Password must contain at least 6 characters!</p>
                    )}
            </div>
            <input type="submit" value="Register" />
            
        </form>
    );
}

export default Register;