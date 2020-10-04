import React, { Component } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import _ from "lodash/fp";
import { Link, BrowserRouter as Router} from "react-router-dom";
import './Form.css';
import doctorRegisterRequest from '../requests/doctorRegisterRequest';

const RegisterDoctor = (props) => {

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        doctorRegisterRequest(data).then(res => {
            console.log(res)
        });
        props.history.push('/login');
    };

    return (
        <div className="auth-wrapper">
              <div className = "auth-inner">
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
                                Date of Birth
                            </label>
                            <input type="text" className="form-control"
                                name="date_of_birth"
                                ref={register({
                                required: true,
                                pattern: /^\d{2}\/\d{2}\/\d{4}$/i,
                                })}
                                placeholder="dd/mm/yyyy"
                            />
                            {_.get("date_of_birth.type", errors) === "required" && (
                                    <p>This field is required!</p>
                            )}
                            {_.get("date_of_birth.type", errors) === "pattern" && (
                                    <p>Invalid date format! (dd/mm/yyyy)</p>
                            )}
                        </div>

                        <div className = "form-group">
                            <label>
                                Phone Number
                            </label>
                            <input type="text" className="form-control"
                                name="phone_number"
                                ref={register({
                                required: true,
                                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                                })}
                                placeholder="+32323281818"
                                // Valid formats: 
                                // +32323281818
                                // (323) 232-8191
                                // (323)456-7829
                                // 163-456-7890
                                // 323.555.7823s
                                // 33333332445
                                // +34626353634
                                // 085-66547785
                            />
                            {_.get("phone_number.type", errors) === "required" && (
                                    <p>This field is required!</p>
                            )}
                            {_.get("phone_number.type", errors) === "pattern" && (
                                    <p>Wrong phone number format!</p>
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
                                pattern: /^\S+@\S+$/i,
                                })}
                                placeholder="e-mail@mail.com"
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
                    <Link className="Link" to='/login' style={{ color: 'blue'}}>Already have an account? Log in here. </Link>
                </div>
            </div>
    );
}

export default RegisterDoctor;