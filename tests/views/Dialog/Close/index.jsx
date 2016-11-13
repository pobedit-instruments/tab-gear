import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Close from '../../../../views/components/Dialog/Close';
import { tabs, actions } from '../../../../stubs/props';

test('Dialog::Close view', () => {
	let component = renderer.create(<Close tabs={ tabs } actions={ actions } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
