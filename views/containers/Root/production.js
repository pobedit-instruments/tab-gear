import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import Application from '../Application';

export default class Root extends Component {
	render () {
		return (
			<Provider store={ this.props.store }>
				<div>
					<Application />
				</div>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
};
