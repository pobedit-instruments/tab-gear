import React, { Component, PropTypes } from 'react';
import { bind } from 'decko';

import * as ActionTypes from '../../../constants/ActionTypes';
import Link from '../../Link';

class Footer extends Component {
	constructor (properties) {
		super(...arguments);
	}

	/**
	 * Discard all tabs
	 *
	 * @param {Event} event
	 */
	@bind
	discardTabs (event) {
		let { tabs, actions } = this.props;

		actions.Layout.discardTabs(tabs.actual);
		event.preventDefault();
	}

	/**
	 * Show credentials
	 *
	 * @param {Event} event
	 */
	@bind
	showCredentials (event) {
		let { actions } = this.props;

		actions.Layout.showCredentials();
		event.preventDefault();
	}

	/**
	 * Open browser extensions
	 *
	 * @param {Event} event
	 */
	@bind
	openExtensions (event) {
		let { actions } = this.props;

		actions.Layout.openExtensions();
		event.preventDefault();
	}

	/**
	 * Show the credentials link?
	 *
	 * @returns {boolean}
	 */
	hasCredentials () {
		return this.props.type !== ActionTypes.SHOW_CREDENTIALS;
	}

	/**
	 * Show the extensions link?
	 *
	 * @returns {boolean}
	 */
	hasExtensions () {
		let { tabs } = this.props;

		return tabs.active.url !== 'chrome://extensions/';
	}

	/**
	 * Show the discard link?
	 *
	 * @returns {boolean}
	 */
	hasDiscard () {
		let { tabs, type } = this.props;

		try {
			if (type === ActionTypes.DISCARD_TABS || typeof chrome.tabs.discard === 'undefined') {
				return false;
			}

			return tabs.actual.some(tab => {
				return tab.autoDiscardable && !tab.discarded && !tab.active;
			});
		}
		catch (error) {
			console.log('Could not find chrome.tabs.discard method');
		}
	}

	render () {
		return <div className="tg-panel">
					<Link onClick={ this.showCredentials } filter={ this.hasCredentials() }>
						{ chrome.i18n.getMessage('show_credentials') }
					</Link>

					<Link onClick={ this.openExtensions } filter={ this.hasExtensions() }
					      mods={[ 'block' ]}>
						{ chrome.i18n.getMessage('open_extensions') }
					</Link>

					<Link onClick={ this.discardTabs } filter={ this.hasDiscard() }
					      mods={[ 'block' ]}>
						{ chrome.i18n.getMessage('discard') }
					</Link>
				</div>;
	}
}

Footer.propTypes = {
	tabs   : PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default Footer;
