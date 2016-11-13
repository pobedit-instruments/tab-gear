import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';

// import Tabs from '../../../views/components/Tabs';
// import * as props from '../../../stubs/props';

jest.mock('react-dom');
jest.mock('react-sortablejs');

// https://github.com/facebook/jest/issues/1353

test.skip('Tabs view', () => {
	let states = ['', 'is-active', 'is-empty'];

	for (let state of states) {
		let component = renderer.create(<Tabs { ...props } state={ state } />);
		let view = component.toJSON();

		let actual = expect(view);

		actual.toMatchSnapshot();
	}
});
