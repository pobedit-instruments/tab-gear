import React, { Component, PropTypes } from 'react';

import Link from '../Link';
import Text from '../Text';

class Error extends Component {
	render () {
		let { email, legal } = this.props.config;

		return <Text>
					<p>
						{ chrome.i18n.getMessage('wrong') }
						<br />
						{ chrome.i18n.getMessage('contact') }

						<Link href={ `mailto:${email}` } mods={[ 'external' ]}>
							{ email }
						</Link>.
					</p>
				</Text>;
	}
}

Error.propTypes = {
	config: PropTypes.object.isRequired
};

export default Error;
