
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom'
import SearchDoctor from '../components/general/SearchDoctor';
import LoginPageUser from '../components/user/LoginPageUser';
import SignUpPageUser from '../components/user/SignUpPageUser';


describe('SearchDoctor Form', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'debug').mockImplementation(jest.fn());
      });

        let wrapped;

        beforeEach(() => {
            wrapped = mount(
                <BrowserRouter>
                    <SearchDoctor/>
                </BrowserRouter>);
        });

        it('Component has input field for text', () => {
            wrapped.find('input');
        });

        it('Reflects changes and submit properly', () => { 

            expect(wrapped.find('SearchDoctor').instance().state.searched).toEqual(false);

            wrapped.find('input').at(0).simulate('change', { 
                target: {name: 'condition_docname', value: 'SomeDoctorName'} 
            });

            wrapped.update();
            expect(wrapped.find('SearchDoctor').instance().state.condition_docname).toEqual('SomeDoctorName');

            wrapped.find('input').at(1).simulate('change', { 
                target: {name: 'city_region', value: 'SomeCityQuery'} 
            });

            wrapped.update();

            expect(wrapped.find('SearchDoctor').instance().state.city_region).toEqual('SomeCityQuery');

            wrapped.find("form").simulate("submit");
            wrapped.update();

            expect(wrapped.find('SearchDoctor').instance().state.submitted).toEqual(true);
            //submitting the form will make searched state true
        });

        afterEach(() => { 
            wrapped.unmount(); 
        });
});


describe('RegisterUser Form', () => {
    let wrapped;

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'debug').mockImplementation(jest.fn());
      });

    beforeEach(() => {
        wrapped = mount(
            <BrowserRouter>
                <SignUpPageUser/>
            </BrowserRouter>);
    });

    afterEach(() => { 
        wrapped.unmount(); 
    });

    it('Component has input field for text', () => {
        wrapped.find('input');
    });

    it('Reflects changes properly', () => { 

        wrapped.find('input').at(0).simulate('change', { 
            target: {name: 'first_name', value: 'Nathan'} 
        });
        wrapped.find('input').at(1).simulate('change', { 
            target: {name: 'last_name', value: 'Kursk'} 
        });
        wrapped.find('input').at(2).simulate('change', { 
            target: {name: 'email', value: 'Nathan1@mail.com'} 
        });
        wrapped.find('input').at(3).simulate('change', { 
            target: {name: 'password', value: 'test22'} 
        });
        wrapped.find('input').at(4).simulate('change', { 
            target: {name: 'passwordConfirm', value: 'test22'} 
        });

        wrapped.update();

        expect(wrapped.find('SignUpPageUser').instance().state.first_name).toEqual('Nathan');
        expect(wrapped.find('SignUpPageUser').instance().state.password).toEqual('test22'); 

        wrapped.find("form").simulate("submit");
        wrapped.update();

        expect(wrapped.find('SignUpPageUser').instance().state.errors).toEqual({});
        // No errors after succesfull Sign Up
    });
});



describe('LoginPageUser Form', () => {
    let wrapped;
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'debug').mockImplementation(jest.fn());
      });

    beforeEach(() => {
        wrapped = mount(
            <BrowserRouter>
                <LoginPageUser/>
            </BrowserRouter>);
    });

    it('Component has input field for text', () => {
        wrapped.find('input');
    });

    it('Reflects changes and submit properly', () => { 

        wrapped.find('input').at(0).simulate('change', { 
            target: {name: 'email', value: 'user@mail.com'} 
        });

        wrapped.update();
        expect(wrapped.find('LoginPageUser').instance().state.email).toEqual('user@mail.com');

        wrapped.find("form").simulate("submit");
        wrapped.update();

        expect(wrapped.find('LoginPageUser').instance().state.errors).toEqual({"password": "⚠ Password is required!"});
        //fires password errors in case not all fields inserted

        wrapped.find('input').at(1).simulate('change', { 
            target: {name: 'password', value: 'secret'} 
        });

        wrapped.update();
        expect(wrapped.find('LoginPageUser').instance().state.password).toEqual('secret');
    });

    afterEach(() => { 
        wrapped.unmount(); 
    });
});

