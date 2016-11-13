import { bindActionCreators } from 'redux';

import actual from './tabs';
import * as Actions from '../views/actions';
import * as ActionTypes from '../views/constants/ActionTypes';
import config from '../config';

export const tabs = {
	actual,
	masked: false,
	active: actual.find(tab => tab.active),
	search: actual
};

export const type = ActionTypes.SHOW_TABS;

export const actions = new function () {
	let actions = {};

	for (let [name, value] of Object.entries(Actions)) {
		actions[name] = bindActionCreators(value, () => {});
	}

	return actions;
};

export { config };
