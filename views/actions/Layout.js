import * as ActionTypes from '../constants/ActionTypes';

export const Layout = {
	/**
	 * Close all tabs
	 *
	 * @param {Array} tabs — the list of tabs to close
	 * @returns {Object}
	 */
	closeAllTabs (tabs) {
		return {
			type: ActionTypes.CLOSE_ALL_TABS,
			api: true,
			tabs
		};
	},

	/**
	 * Ignore the tab dialog
	 *
	 * @param {boolean} state
	 * @returns {Object}
	 */
	ignoreTabDialog (state = false) {
		return {
			type: ActionTypes.IGNORE_WARNING_DIALOG,
			state
		};
	},

	/**
	 * Show the dialog to prevent closing multiple tabs
	 *
	 * @param {string} type
	 * @param {Array} tabs — the list of tabs to close
	 * @returns {Object}
	 */
	showDialog (type, tabs) {
		return {
			type,
			tabs
		};
	},

	/**
	 * Open browser extensions
	 *
	 * @returns {Object}
	 */
	openExtensions () {
		return {
			type: ActionTypes.OPEN_EXTENSIONS,
			api: true
		};
	},

	/**
	 * Show credentials
	 *
	 * @returns {Object}
	 */
	showCredentials () {
		return {
			type: ActionTypes.SHOW_CREDENTIALS
		};
	},

	/**
	 * Discards the tabs from memory
	 *
	 * @param {Array} tabs — the list of tabs to close
	 * @returns {Object}
	 */
	discardTabs (tabs) {
		return {
			type: ActionTypes.DISCARD_TABS,
			api: true,
			tabs
		};
	}
};

