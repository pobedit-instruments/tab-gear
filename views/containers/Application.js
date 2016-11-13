import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Components from '../components/Index';
import config from '../../config';
import * as Actions from '../actions';

window.localStorage.debug = 'tg:*';

class Application extends Component {
	constructor (properties) {
		super(...arguments);

		let { tabs, actions } = this.props;

		actions.Tabs.showTabs(tabs.actual);
	}

	render () {
		return <Components { ...this.props } />;
	}
}

Application.propTypes = {
	tabs   : PropTypes.object,
	type   : PropTypes.string,
	config : PropTypes.object,
	actions: PropTypes.object
};

let mapStateToProps = (state, properties) => {
	let {
		loadData     : actual,
		searchResults: search,
		isMasked     : masked,
		type,
		active
	} = state;

	return {
		tabs: {
			actual,
			masked,
			active,
			search
		},

		config,
		type
	};
};

let mapDispatchToProps = dispatch => {
	let actions = {};

	for (let [name, value] of Object.entries(Actions)) {
		actions[name] = bindActionCreators(value, dispatch);
	}

	return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
