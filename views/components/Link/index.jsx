import React, { Component, PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';
import './index.css';

let classes = new BEMHelper({
	name: 'tg-link'
});

let Link = ({ children, href = '#', mods = [], filter, index, onClick }) => {
	if (filter !== false) {
		return <a { ...classes(null, mods) }
		          href={ href }
		          tabIndex={ index }
		          onClick={ onClick }>
					{ children }
				</a>;
	}

	return null;
};

Link.propTypes = {
	children: PropTypes.node,
	mods    : PropTypes.array,
	filter  : PropTypes.bool,
	index   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick : PropTypes.func
};

export default Link;
