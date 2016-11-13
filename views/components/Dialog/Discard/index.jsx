import React, { Component, PropTypes } from 'react';
import { bind } from 'decko';

class Discard extends Component {
	constructor (properties) {
		super(...arguments);
	}

	/**
	 * Show tabs
	 *
	 * @param {Event} event
	 */
	@bind
	showTabs (event) {
		let { tabs, actions } = this.props;
		let { actual } = tabs;

		actions.Tabs.showTabs(actual);

		event.preventDefault();
	}

	render () {
		return <div>
					<p className="tg-block">
						{ chrome.i18n.getMessage('discarded') }
					</p>

					<p className="tg-block">
						<button className="tg-button" onClick={ this.showTabs } autoFocus="autoFocus">
							{ chrome.i18n.getMessage('proceed') }
						</button>
					</p>
				</div>;
	}
}

Discard.propTypes = {
	tabs   : PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default Discard;
