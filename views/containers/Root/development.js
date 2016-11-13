import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import Application from '../Application';
import DevTools from '../DevTools';

export default class Root extends Component {
	render () {
		return <Provider store={ this.props.store }>
					<div>
						<Application />
						<DevTools />
					</div>
				</Provider>;
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
};
