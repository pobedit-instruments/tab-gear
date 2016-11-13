import { combineReducers } from 'redux';

import Tabs from './Tabs';
import Layout from './Layout';

export default combineReducers({ ...Tabs, ...Layout });
