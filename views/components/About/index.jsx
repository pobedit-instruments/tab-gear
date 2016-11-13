import React, { Component, PropTypes } from 'react';

import Link from '../Link';
import Text from '../Text';
// import Share from '../Share';

class About extends Component {
	constructor (properties) {
		super(...arguments);
	}

	componentDidMount () {
		window.scrollTo(0, 0);
	}

	getFeatures () {
		let features = [
			'tab_list',
			'search',
			'incognito',
			'discarding',
			'moving',
			'close_tabs',
			'close_all_tabs',
			'total_tabs',
			'open_extensions',
			'i18n',
			'shortcuts',
			'prevent_closing',
			'highlighting',
			// 'confirmation'
			// 'navigation',
		];

		return features.map((feature, index) => {
			return <li className="tg-list__item" key={ index }>
						{ chrome.i18n.getMessage(`feature_${feature}`) }
					</li>;
		});
	}

	render () {
		let { email, legal, year } = this.props.config;

		return <Text>
					<p className="tg-block">
						{ chrome.i18n.getMessage('description') }
					</p>

					<p className="tg-block">
						{ chrome.i18n.getMessage('features') }
					</p>

					<ul className="tg-list">
						{ this.getFeatures() }
					</ul>

					<p className="tg-block_small tg-center">
						{ `@ ${legal}, ${year}` }.
					</p>

					{/* <Share />*/}
				</Text>;
	}
}

About.propTypes = {
	config: PropTypes.object.isRequired
};

export default About;
