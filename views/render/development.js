import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

import '../../stubs/api';
import Root from '../containers/Root';
import Store from '../store/configure';

let store = Store(),
	index = document.getElementById('root');

try {
	ReactDOM.render(<Root store={ store } />, index);
}
catch (error) {
	ReactDOM.render(<RedBox error={ error } />, index);
}
