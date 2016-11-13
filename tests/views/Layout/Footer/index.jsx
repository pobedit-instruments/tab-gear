import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Footer from '../../../../views/components/Layout/Footer';
import * as props from '../../../../stubs/props';

test('Layout::Footer view', () => {
	let component = renderer.create(<Footer { ...props } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
