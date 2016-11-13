import React, { Component, PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';
import './index.css';

let classes = new BEMHelper({
	name: 'tg-body'
});

let Overlay = ({ state, children }) => {
	return <div>
				<div { ...classes(null, 'disable', state ? 'is-active' : 'is-inactive') } />
				<div className="tg-tabs__search-results"> { children } </div>
			</div>;
};

Overlay.propTypes = {
	state   : PropTypes.any.isRequired,
	children: PropTypes.node
};

export default Overlay;
