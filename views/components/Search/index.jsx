import React, { Component, PropTypes } from 'react';
import * as ActionTypes from '../../constants/ActionTypes';
import BEMHelper from 'react-bem-helper';
import { bind } from 'decko';
import { KeyKit } from 'keykit';

import './index.css';

class Search extends Component {
	constructor () {
		super(...arguments);

		this.class = new BEMHelper({
			name: 'tg-search'
		});

		this.state = {
			value: '',
			switchTab: false
		};
	}

	shouldComponentUpdate () {
		let types = [
			ActionTypes.DISABLE_TABS,
			ActionTypes.SEARCH_TABS
		];

		return types.includes(this.props.type);
	}

	componentDidMount () {
		document.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnmount () {
		document.removeEventListener('keydown', this.onKeyDown);
	}

	@bind
	onKeyDown (event) {
		switch (event.key) {
			case 'Tab':
				return event.preventDefault();

			case 'Escape':
				return this.input.blur();

			default:
				try {
					let { visible, printable } = KeyKit.key(event.keyCode);

					if (visible && printable) {
						 this.input.focus();
					}
				}
				catch (error) {
					console.error(error);
				}
		}
	}

	@bind
	onFocus (event) {
		let { actions, tabs } = this.props;

		let state = tabs.actual.length !== tabs.search.length;

		actions.Tabs.maskTabs(tabs.actual, state);
	}

	@bind
	onBlur (event) {
		let { actions, tabs, type } = this.props;

		// searchTabs event should be called before.
		// Also we shouldn't care about "focusin" event
		if (!event.relatedTarget || event.relatedTarget.dataset.name !== 'tab') {
			actions.Tabs.maskTabs(tabs.actual, false);
		}
	}

	@bind
	clearSearch (event) {
		let { tabs, actions } = this.props;

		actions.Tabs.searchTabs(tabs.actual);
		this.setState({ value: '' });
	}

	@bind
	searchTabs (event) {
		let { tabs, actions } = this.props;
		let { value } = event.target;

		this.setState({ value });

		actions.Tabs.searchTabs(tabs.actual, value);
		event.stopPropagation();
	}

	render () {
		let { value } = this.state;

		let state = {
			extra: {
				'is-active': value.length > 0
			}
		};

		return <div { ...this.class(state) }>
					<input className="tg-search__input" type="text"
					       value={ value }
					       ref={ input => this.input = input }
					       placeholder={ chrome.i18n.getMessage('search') }
					       onFocus={ this.onFocus }
					       onBlur={ this.onBlur}
					       onInput={ this.searchTabs } />

				<div className="tg-icon tg-search__clear" onClick={ this.clearSearch } />
			</div>;
	}
}

Search.propTypes = {
	tabs   : PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default Search;
