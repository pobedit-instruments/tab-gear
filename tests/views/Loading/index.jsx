import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

import Loading from '../../../views/components/Loading';

test('Loading view', () => {
	let component = renderer.create(<Loading />);
	let view = component.toJSON();

	let actual = expect(view);

	actual.toMatchSnapshot();
});
