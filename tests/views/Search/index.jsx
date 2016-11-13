import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Search from '../../../views/components/Search';
import * as props from '../../../stubs/props';

test('Search view', () => {
	let component = renderer.create(<Search { ...props } />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
