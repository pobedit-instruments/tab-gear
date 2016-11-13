import * as ActionTypes from '../constants/ActionTypes';

export const Error = {
	/**
	 * Show errors
	 *
	 * @returns {Object}
	 */
	showErrors () {
		return {
			type: ActionTypes.SHOW_ERRORS
		};
	}
};
