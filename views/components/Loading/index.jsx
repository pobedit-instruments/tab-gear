import React, { Component, PropTypes } from 'react';

import Text from '../Text';

class Loading extends Component {
	render () {
		return <Text> { chrome.i18n.getMessage('wait') } </Text>;
	}
}

Loading.propTypes = {};

export default Loading;
