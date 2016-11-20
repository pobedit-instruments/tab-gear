import React, { Component, PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';
import { bind } from 'decko';
import ReactSortable from 'react-sortablejs';

import './index.css';

class List extends Component {
	constructor (properties) {
		super(...arguments);

		this.class = new BEMHelper({
			name: 'tg-tabs'
		});
	}

	/**
	 * Highlights the given tabs
	 *
	 * @param {Event} event
	 */
	@bind
	switchTab (event) {
		let { index } = event.currentTarget.dataset;
		let { actions, tabs } = this.props;

		actions.Tabs.switchTab(index);
		actions.Tabs.maskTabs(tabs.actual, false);

		event.stopPropagation();
		event.preventDefault();
	}

	/**
	 * Closes selected tab
	 *
	 * @param {Event} event
	 */
	@bind
	closeTab (event) {
		let { id } = event.currentTarget.dataset;
		let { actions } = this.props;

		actions.Tabs.closeTab(id);

		event.stopPropagation();
		event.preventDefault();
	}

	/**
	 * Move tabs
	 *
	 * @param {Array} ids
	 * @param {Object} options
	 * @param {Event} event
	 */
	@bind
	moveTabs (ids, options, event) {
		let { tabs, actions } = this.props;

		actions.Tabs.moveTabs(tabs.actual, ids);
	}

	/**
	 * Get tabs
	 *
	 * @param {string} name
	 * @returns {JSX}
	 */
	getItems (name) {
		let { items } = this.props;

		return items.map((tab, key) => {
			let { id, index, title, url, incognito, favIconUrl, highlighted } = tab;

			let state = [];

			if (incognito) {
				state.push('incognito');
			}

			if (highlighted) {
				state.push('highlighted');
			}

			if (!title.trim()) {
				title = url;
			}

			return <li { ...this.class('item', state) } key={ key } data-id={ id }>
						<a { ...this.class('item-link') } href="#"
						   data-index={ index }
						   data-name="tab"
						   title={ url }
						   onClick={ this.switchTab }>

							<img { ...this.class('item-icon') } src={ favIconUrl } />

							<span { ...this.class('item-text') }> { title } </span>

							<span { ...this.class('item-close', null, 'tg-icon') }
							      data-id={ id }
							      title={ chrome.i18n.getMessage('close') }
							      onClick={ this.closeTab } />
						</a>
					</li>;
		});
	}

	render () {
		return <ReactSortable tag="ul"
		                 options={ { animation: 150 } }
		                 onChange={ this.moveTabs }
		                 { ...this.class({ extra: this.props.state }) }>
					{ this.getItems('tg-tabs__item') }
				</ReactSortable>;
	}
}

List.propTypes = {
	items  : PropTypes.array.isRequired,
	tabs   : PropTypes.object.isRequired,
	state  : PropTypes.string,
	actions: PropTypes.object.isRequired
};

export default List;
