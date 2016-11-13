import React, { Component, PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';

let classes = new BEMHelper({
	name: 'tg-box'
});

let Text = ({ className = '', children }) => {
	return <div { ...classes({ extra: className }) }> { children } </div>;
};

Text.propTypes = {
	children : PropTypes.node.isRequired,
	className: PropTypes.string
};

export default Text;
