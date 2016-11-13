import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Title from '../../../../views/components/Layout/Title';
import * as props from '../../../../stubs/props';

test('Layout::Title view', () => {
	let component = renderer.create(<Title { ...props } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
