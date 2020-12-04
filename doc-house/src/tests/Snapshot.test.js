import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json'
import Main from '../components/main/Main';
import ChatApp from '../components/chat/ChatApp';



describe('Snapshots', () => {
    it("renders correctly", () => {
        const tree = shallow(<Main />);
        expect(toJSON(tree)).toMatchSnapshot();
    });

    it("renders correctly", () => {
        const tree = shallow(<ChatApp />);
        expect(toJSON(tree)).toMatchSnapshot();
    });
});