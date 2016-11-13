import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Header from '../../../../views/components/Layout/Header';
import * as props from '../../../../stubs/props';

test('Layout::Header view', () => {
	let component = renderer.create(<Header { ...props } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
