import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Layout from './Layout';
import Search from './Search';
import * as SearchValues from '../constants/SearchValues';
import * as ActionTypes from '../constants/ActionTypes';

export default class Index extends Component {
	constructor (properties) {
		super(...arguments);
	}

	/**
	 *  Detects search bar
	 *  @returns {boolean}
	 */
	hasSearch () {
		let { type, tabs } = this.props;

		switch (type) {
			case ActionTypes.SHOW_CREDENTIALS:
			case ActionTypes.DISCARD_TABS:
			case ActionTypes.CLOSE_ALL_TABS:
			case ActionTypes.SHOW_ERRORS:
			case ActionTypes.TABS_LOCKED:
				return false;

			default:
				if (type !== ActionTypes.SEARCH_TABS &&
					tabs.actual.length <= SearchValues.MIN_TABS_FOR_SEARCH) {
					return false;
				}
		}

		return true;
	}

	/**
	 * Get children components
	 *
	 * @returns {Array<Component>}
	 */
	getComponents () {
		let layout = Layout();

		if (this.hasSearch()) {
			layout.splice(2, 0, Search);
		}

		return layout.map((Component, key) => {
			return <Component { ...this.props } key={ key } />;
		});
	}

	render () {
		return <div className="tg-index"> { this.getComponents() } </div>;
	}
}

Index.propTypes = {
	tabs   : PropTypes.object.isRequired,
	type   : PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired
};
