import chrome from 'chrome-stub';

import tabs from './tabs';
import locale from '../locale/en/messages.json';

chrome.i18n._locales = locale;

let methods = [
	'query',
	'remove',
	'move',
	'create',
	'discard',
	'highlight'
];

for (let method of methods) {
	chrome.tabs[method].yields(tabs);
}

export default chrome;
