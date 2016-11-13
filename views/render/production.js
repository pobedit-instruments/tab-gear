import React from 'react';
import ReactDOM from 'react-dom';

import Root from '../containers/Root';
import Store from '../store/configure';

let store = Store(),
	index = document.getElementById('root');

ReactDOM.render(<Root store={ store } />, index);
