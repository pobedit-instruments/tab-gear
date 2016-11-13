import React, { Component, PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';
import { bind } from 'decko';

import * as ActionTypes from '../../../constants/ActionTypes';
import './index.css';

class Title extends Component {
	constructor (properties) {
		super(...arguments);

		this.class = new BEMHelper({
			name: 'tg-title'
		});

		this.state = {
			credentials: false
		};
	}

	/**
	 * Show credentials
	 *
	 * @param {Event} event
	 */
	@bind
	showCredentials (event) {
		let { actions, type } = this.props;

		let types = [
			ActionTypes.SHOW_TABS,
			ActionTypes.SEARCH_TABS,
			ActionTypes.DISABLE_TABS
		];

		let active = types.includes(type);

		if (active) {
			actions.Layout.showCredentials();
		}
		else {
			actions.Tabs.showTabs();
		}

		this.setState({ credentials: active });

		event.preventDefault();
	}

	getTitle (type, tabs) {
		let title = [];

		switch (type) {
			case ActionTypes.SHOW_CREDENTIALS:
			case ActionTypes.SHOW_ERRORS:
			case ActionTypes.DISCARD_TABS:
			case ActionTypes.TABS_LOCKED:
			case ActionTypes.SEARCH_TABS:
				let { length } = tabs.search;

				title = [type, length];

				if (type !== ActionTypes.SEARCH_TABS || length) {
					break;
				}

			default:
				title = [ActionTypes.SHOW_TABS, tabs.actual.length];
		}

		let [ key, value ] = title;

		return chrome.i18n.getMessage(key.toLowerCase(), [ value ]);
	}

	render () {
		let { tabs, type } = this.props;

		return <div { ...this.class() }>
					<div { ...this.class('logo') } />

					<div { ...this.class('text') }>
						{ this.getTitle(type, tabs) }
					</div>

					<a href="#" tabIndex="1" className="tg-icon tg-controls__more"
					   onClick={ this.showCredentials } />
				</div>;
	}
}

Title.propTypes = {
	tabs: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired
};

export default Title;
