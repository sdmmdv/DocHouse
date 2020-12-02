import React from 'react';
import HomePage from '../components/general/HomePage';
import LogTransition from '../components/general/LogTransition';
import NotFound from '../components/general/NotFound';
import {AppWithRouter} from '../components/main/Main';
import ChatApp from '../components/chat/ChatApp';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';


describe('Analyse React Router V5', () => {

        it('Homepage renders for path "/"', () => {
            const wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <AppWithRouter/>
            </MemoryRouter>
            );
            expect(wrapper.find(HomePage)).toHaveLength(1);
            expect(wrapper.find(NotFound)).toHaveLength(0);
        });

        it('Invalid path redirects to 404 NotFound page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/WrongUrl' ]}>
            <AppWithRouter/>
            </MemoryRouter>
        );
        expect(wrapper.find(HomePage)).toHaveLength(0);
        expect(wrapper.find(NotFound)).toHaveLength(1);
        });

        it('Login Transition renders for path "/log-transition"', () => {
            const wrapper = mount(
            <MemoryRouter initialEntries={[ '/log-transition' ]}>
                <AppWithRouter/>
            </MemoryRouter>
            );
            expect(wrapper.find(LogTransition)).toHaveLength(1);
            expect(wrapper.find(HomePage)).toHaveLength(0);
            expect(wrapper.find(NotFound)).toHaveLength(0);
        });

        it('ChatApp renders for paths mounted after "/chat/"', () => {
            const wrapper = mount(
            <MemoryRouter initialEntries={[ '/chat' ]}>
                <AppWithRouter/>
            </MemoryRouter>
            );
            expect(wrapper.find(ChatApp)).toHaveLength(1);
            expect(wrapper.find(NotFound)).toHaveLength(0);

            wrapper.setProps({ initialEntries: [ '/chat/rooms/someRoomId' ]});

            expect(wrapper.find(ChatApp)).toHaveLength(1);
            expect(wrapper.find(NotFound)).toHaveLength(0);
        });

});
