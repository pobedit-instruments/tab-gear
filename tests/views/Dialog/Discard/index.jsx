import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Discard from '../../../../views/components/Dialog/Discard';
import { tabs, actions } from '../../../../stubs/props';

test('Dialog::Discard view', () => {
	let component = renderer.create(<Discard tabs={ tabs } actions={ actions } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
