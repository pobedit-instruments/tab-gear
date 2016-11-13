import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import Middleware from '../../middleware';
import rootReducer from '../../reducers';

export default function (initialState) {
	let middleware = applyMiddleware(thunk, Middleware);

	return createStore(rootReducer, initialState, middleware);
};
