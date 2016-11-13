import React, { Component, PropTypes } from 'react';
import { bind } from 'decko';

class Close extends Component {
	constructor (properties) {
		super(...arguments);
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

		actions.Layout.closeAllTabs(actual);
		actions.Tabs.showTabs(actual);

		event.preventDefault();
	}

	/**
	 * Close all tabs
	 *
	 * @param {Event} event
	 */
	@bind
	ignoreTabDialog (event) {
		window.localStorage.setItem('tg-option-dialog', event.target.checked);
	}

	render () {
		return <div>
					<p className="tg-block">
						{ chrome.i18n.getMessage('attention_closing') }
					</p>

					<button className="tg-button" onClick={ this.closeAllTabs } autoFocus="autoFocus">
						{ chrome.i18n.getMessage('confirm') }
					</button>

					<p className="tg-block">
						<input type="checkbox" id="confirm" onChange={ this.ignoreTabDialog } />
						<label htmlFor="confirm" className="tg-label">
							{ chrome.i18n.getMessage('prevent_confirmation') }
						</label>
					</p>
				</div>;
	}
}

Close.propTypes = {
	tabs   : PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default Close;
