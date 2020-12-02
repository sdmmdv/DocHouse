import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom'
import ViewProfile from '../components/general/ViewProfile';
import Navbar from '../components/general/Navbar';

describe('ViewProfile', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'debug').mockImplementation(jest.fn());
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
      });

    let wrapped;
    beforeEach(() => {
        wrapped = mount(
            <BrowserRouter>
                <ViewProfile/>
            </BrowserRouter>);
    });

    it('SetState works without crashing', () => { 
        wrapped.find('ViewProfile').instance().setState({
            modalOpen: true,
            loading:  false,
            explanation: 'testExplanation'
        }); 

        wrapped.update();
        expect(wrapped.find('ViewProfile').instance().state.modalOpen).toEqual(true);
        expect(wrapped.find('ViewProfile').instance().state.loading).toEqual(false);
        expect(wrapped.find('ViewProfile').instance().state.explanation).toEqual('testExplanation');
    });

    afterEach(() => { 
        wrapped.unmount(); 
    });

});


describe('Navigation Bar', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'debug').mockImplementation(jest.fn());
      });

    let wrapped;
    beforeEach(() => {
        wrapped = mount(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>);
    });

    it('SetState works without crashing', () => { 
        wrapped.find('Navbar').instance().setState({
            left: true,
            type:  'doctor',
        }); 

        wrapped.update();
        expect(wrapped.find('Navbar').instance().state.left).toEqual(true);
        expect(wrapped.find('Navbar').instance().state.type).toEqual('doctor');
    });

    afterEach(() => { 
        wrapped.unmount(); 
    });

});