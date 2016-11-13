import camelCase from 'camelcase';
import * as ActionTypes from '../constants/ActionTypes';

import methods from './api';

export default store => dispatch => action => {
	let state = store.getState();

	let { type, api } = action;

	try {
		let skip = [
			ActionTypes.OPEN_EXTENSIONS,
			ActionTypes.MOVE_TABS
		];

		if (!skip.includes(type)) {
			dispatch({ type: ActionTypes.TABS_LOCKED });
		}

		if (api) {
			let name = camelCase(type);

			return methods[name](action, dispatch);
		}

		return dispatch({ ...action, tabs: state.loadData });
	}
	catch (error) {
		error = chrome.runtime.lastError || error.message;

		dispatch({ type : ActionTypes.CHROME_API_EXCEPTION, error });

		console.error(error);
	}
};
