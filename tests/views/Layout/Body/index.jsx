import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

// import Body from '../../../../views/components/Layout/Body';
// import * as props from '../../../../stubs/props';

jest.mock('react-dom');

test.skip('Layout::Body view', () => {
	let component = renderer.create(<Body { ...props } />);
	let view = component.toJSON();

	let actual = expect(view);
	actual.toMatchSnapshot();
});
