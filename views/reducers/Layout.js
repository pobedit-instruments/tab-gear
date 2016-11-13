import * as ActionTypes from '../constants/ActionTypes';

export default {
	/**
	 * Detect type
	 *
	 * @param {string} state
	 * @param {Object} action
	 * @returns {*}
	 */
	type (state, action) {
		return action.type;
	},

	/**
	 * Shows error
	 *
	 * @param {string} state — the error string
	 * @param {Object} action
	 * @returns {*}
	 */
	showErrors (state = '', action) {
		let { type, error } = action;

		switch (type) {
			case ActionTypes.TABS_COULD_NOT_BE_LOADED:
				return error;

			case ActionTypes.UNKNOWN_ERROR:
				return error;

			default:
				return state;
		}
	},

	/**
	 * Open browser extensions
	 *
	 * @param {boolean} state
	 * @param {Object} action
	 * @returns {*}
	 */
	openExtensions (state = false, action) {
		let { type, error } = action;

		switch (type) {
			case ActionTypes.TAB_CLOSE_EXCEPTION:
				return error;

			case ActionTypes.OPEN_EXTENSIONS:
				return true;

			default:
				return state;
		}
	},

	/**
	 * Show credentials
	 *
	 * @param {boolean} state
	 * @param {Object} action
	 * @returns {*}
	 */
	showCredentials (state = false, action) {
		let { type } = action;

		switch (type) {
			case ActionTypes.SHOW_CREDENTIALS:
				return true;

			default:
				return state;
		}
	},

	/**
	 * Show dialog
	 *
	 * @param {Array} state
	 * @param {Object} action
	 * @returns {*}
	 */
	showDialog (state = false, action) {
		return action.type || state;
	},

	/**
	 * Ignore the tab dialog
	 *
	 * @param {boolean} state
	 * @param {Object} action
	 * @returns {*}
	 */
	ignoreTabDialog (state = false, action) {
		let { type, tabs } = action;

		switch (type) {
			case ActionTypes.IGNORE_WARNING_DIALOG:
				return true;

			default:
				return state;
		}
	}
};
