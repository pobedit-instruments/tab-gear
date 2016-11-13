import React, { Component, PropTypes } from 'react';
import { bind } from 'decko';
import * as ActionTypes from '../../../constants/ActionTypes';

import Link from '../../Link';

class Header extends Component {
	constructor (properties) {
		super(...arguments);
	}

	/**
	 * Get initial dialog state
	 *
	 * @returns {boolean}
	 */
	ignoreDialog () {
		let state = window.localStorage.getItem('tg-option-dialog');

		try {
			return JSON.parse(state);
		}
		catch (error) {
			return false;
		}
	}

	/**
	 * Close all tabs
	 *
	 * @param {Event} event
	 */
	@bind
	closeAllTabs (event) {
		let { tabs, actions } = this.props;
		let { actual } = tabs;

		if (this.ignoreDialog()) {
			actions.Layout.closeAllTabs(actual);
			actions.Tabs.showTabs(actual);
		}
		else {
			actions.Layout.showDialog(ActionTypes.CLOSE_ALL_TABS, actual);
		}

		event.preventDefault();
	}

	/**
	 * Back to the tabs
	 *
	 * @param {Event} event
	 */
	@bind
	showTabs (event) {
		let { tabs, actions } = this.props;

		actions.Tabs.showTabs(tabs.actual);
		event.preventDefault();
	}

	/**
	 * Show the back link?
	 *
	 * @returns {boolean}
	 */
	hasBack () {
		let types = [
			ActionTypes.SHOW_CREDENTIALS,
			ActionTypes.CLOSE_ALL_TABS
		];

		return types.includes(this.props.type);
	}

	/**
	 * Show the close link?
	 *
	 * @returns {boolean}
	 */
	hasClose () {
		return this.props.type !== ActionTypes.CLOSE_ALL_TABS;
	}

	render () {
		let closeMods = ['close'];

		if (this.props.type === ActionTypes.CLOSE_ALL_TABS) {
			closeMods.push('hide');
		}

		return <div className="tg-panel">
					<Link onClick={ this.showTabs } filter={ this.hasBack() }
					      mods={[ 'back' ]} index="2">
						{ chrome.i18n.getMessage('back') }
					</Link>

					<Link onClick={ this.closeAllTabs } filter={ this.hasClose() }
					      mods={ closeMods } index="3">
						{ chrome.i18n.getMessage('close_all') }
					</Link>
				</div>;
	}
}

Header.propTypes = {
	type   : PropTypes.string.isRequired,
	tabs   : PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default Header;
