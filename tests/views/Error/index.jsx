import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import config from '../../../config';
import Error from '../../../views/components/Error';

test('Error view', () => {
	let component = renderer.create(<Error config={ config } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
