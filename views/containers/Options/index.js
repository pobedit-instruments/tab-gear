void function () {
	try {
		// Translate options
		let elements = document.querySelectorAll('[data-i18n]');

		for (let element of elements) {
			element.textContent = chrome.i18n.getMessage(element.dataset.i18n);
		}

		// Restore options
		let storage = Object.entries(window.localStorage);

		for (let [name, value] of storage) {
			if (name.startsWith('tg-option')) {
				let element = document.getElementById(name);

				element.checked = !JSON.parse(value);
			}
		}

		// Toggle options
		document.addEventListener('change', ({ target }) => {
			if (target.dataset.name === 'option') {
				window.localStorage.setItem(target.id, !target.checked);
			}
		});
	}
	catch (error) {
		console.error(`Something went wrong: ${error.message}`);
	}
}();
