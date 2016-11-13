import { createStore, applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';

import Middleware from '../../middleware';
import rootReducer from '../../reducers';
import DevTools from '../../containers/DevTools';

export default function (initialState) {
	let middleware = Middleware;

	middleware = applyMiddleware(thunk, middleware, reduxLogger());
	middleware = compose(middleware, DevTools.instrument());

	if (module.hot) {
		module.hot.accept('../../reducers', () => {
			store.replaceReducer(rootReducer.default);
		});
	}

	return createStore(rootReducer, initialState, middleware);
};
