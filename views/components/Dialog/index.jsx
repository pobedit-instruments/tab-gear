import React, { Component, PropTypes } from 'react';
import * as ActionTypes from '../../constants/ActionTypes';

import './index.css';
import Error from '../Error';
import Discard from './Discard';
import Close from './Close';
import Text from '../Text';

class Dialog extends Component {
	getComponent () {
		let { tabs, actions, type, config } = this.props;

		switch (type) {
			case ActionTypes.CLOSE_ALL_TABS:
				return <Close tabs={ tabs } actions={ actions } />;

			case ActionTypes.DISCARD_TABS:
				return <Discard tabs={ tabs } actions={ actions } />;

			default:
				return <Error config={ config } />;
		}
	}

	render () {
		return <Text className="tg-dialog">{ this.getComponent() }</Text>;
	}
}

Dialog.propTypes = {
	tabs   : PropTypes.object.isRequired,
	type   : PropTypes.string.isRequired,
	config : PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default Dialog;
