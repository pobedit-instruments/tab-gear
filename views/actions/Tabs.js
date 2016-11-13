import * as ActionTypes from '../constants/ActionTypes';

export const Tabs = {
	/**
	 * Show tabs
	 *
	 * @param {Array} tabs
	 * @returns {Object}
	 */
	showTabs (tabs) {
		return {
			type: ActionTypes.SHOW_TABS,
			api: true,
			tabs
		};
	},

	/**
	 * Move tabs
	 *
	 * @param {Object} tabs
	 * @param {Array} ids
	 * @returns {Object}
	 */
	moveTabs (tabs, ids) {
		return {
			type: ActionTypes.MOVE_TABS,
			api: true,
			tabs,
			ids
		};
	},

	/**
	 * Disable tabs
	 *
	 * @param {Array} tabs
	 * @param {boolean} state
	 * @returns {Object}
	 */
	maskTabs (tabs, state) {
		return {
			type: ActionTypes.DISABLE_TABS,
			tabs,
			state
		};
	},

	/**
	 * Search tabs
	 *
	 * @param {Array} tabs
	 * @param {string} text
	 * @returns {Object}
	 */
	searchTabs (tabs, text) {
		return {
			type: ActionTypes.SEARCH_TABS,
			tabs,
			text
		};
	},

	/**
	 * Highlights the given tabs
	 *
	 * @param {string} index — the tab index to highlight
	 * @returns {Object}
	 */
	switchTab (index) {
		return {
			type: ActionTypes.SWITCH_TAB,
			api: true,
			index
		};
	},

	/**
	 * Closes selected tab
	 *
	 * @param {string} id — the tab id to close
	 * @returns {Object}
	 */
	closeTab (id) {
		return {
			type: ActionTypes.CLOSE_TAB,
			api: true,
			id
		};
	}
};

