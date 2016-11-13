import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import config from '../../../config';
import About from '../../../views/components/About';

test('About view', () => {
	let component = renderer.create(<About config={ config } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
