import * as ActionTypes from '../constants/ActionTypes';
import Fuse from 'fuse.js';

export default {
	/**
	 * The data
	 *
	 * @param {Array} state
	 * @param {Object} action
	 * @returns {Array}
	 */
	loadData (state = [], action) {
		let { type, tabs, ids, text } = action;

		switch (type) {
			case ActionTypes.TABS_LOCKED:
				return state;

			case ActionTypes.SHOW_TABS:
			case ActionTypes.CLOSE_TAB:
			case ActionTypes.MOVE_TABS:
			case ActionTypes.DISABLE_TABS:
				return tabs;

			default:
				return state;
		}
	},

	/**
	 * Get active tab
	 *
	 * @param {Array} state
	 * @param {Object} action
	 * @returns {Object}
	 */
	active (state = {}, action) {
		let { type, tabs } = action;

		if (tabs) {
			return tabs.find(tab => tab.active) || state;
		}

		return state;
	},

	/**
	 * Search results
	 *
	 * @param {Array} state
	 * @param {Object} action
	 * @returns {Array}
	 */
	searchResults (state = [], action) {
		let { type, tabs, text } = action;

		switch (type) {
			case ActionTypes.SEARCH_TABS:
				if (!text) {
					return [];
				}

				let verbose = process.env.NODE_ENV !== 'production';

				let fuse = new Fuse(tabs, {
					verbose,
					threshold    : 0.3,
					caseSensitive: false,
					shouldSort   : true,
					keys         : [ 'title', 'url' ]
				});

				return fuse.search(text);

			default:
				return [];
		}
	},

	/**
	 * Highlights the given tabs
	 *
	 * @param {string} state — the tab index to highlight
	 * @param {Object} action
	 * @returns {*}
	 */
	switchTab (state = '', action) {
		let { type, index, error = '' } = action;

		switch (type) {
			case ActionTypes.SWITCH_TAB:
				return index;

			case ActionTypes.TAB_INDEX_NOT_FOUND:
			case ActionTypes.CHROME_API_EXCEPTION:
				return error;

			default:
				return state;
		}
	},

	/**
	 * Show overlay
	 *
	 * @param {boolean} state
	 * @param {Object} action
	 * @returns {*}
	 */
	isMasked (state = false, action) {
		let { type } = action;

		switch (type) {
			case ActionTypes.DISABLE_TABS:
				return action.state;

			default:
				return state;
		}
	},

	/**
	 * Discards the tabs from memory
	 *
	 * @param {Array} state — the list of tabs to discard
	 * @param {Object} action
	 * @returns {*}
	 */
	discardTabs (state = [], action) {
		let { type, tabs, error = '' } = action;

		switch (type) {
			case ActionTypes.TAB_ITEMS_NOT_FOUND:
			case ActionTypes.CHROME_API_EXCEPTION:
				return error;

			case ActionTypes.DISCARD_TABS:
				return tabs;

			default:
				return state;
		}
	},

	/**
	 * Closes selected tab — the tab id to close
	 *
	 * @param {string} state
	 * @param {Object} action
	 * @returns {*}
	 */
	closeTab (state = '', action) {
		let { type, id, error = '' } = action;

		switch (type) {
			case ActionTypes.TAB_ID_NOT_FOUND:
			case ActionTypes.TAB_CLOSE_EXCEPTION:
			case ActionTypes.CHROME_API_EXCEPTION:
				return error;

			case ActionTypes.CLOSE_TAB:
				return id;

			default:
				return state;
		}
	},

	/**
	 * Close all tabs
	 *
	 * @param {Array} state — the list of tabs to close
	 * @param {Object} action
	 * @returns {*}
	 */
	closeAllTabs (state = [], action) {
		let { type, tabs, error = '' } = action;

		switch (type) {
			case ActionTypes.TAB_ITEMS_NOT_FOUND:
			case ActionTypes.CHROME_API_EXCEPTION:
				return error;

			case ActionTypes.CLOSE_ALL_TABS:
				return tabs;

			default:
				return state;
		}
	}
};
