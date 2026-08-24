(function () {
	'use strict';

	var root = document.documentElement;
	var button = document.querySelector('[data-theme-toggle]');
	var icon = button ? button.querySelector('.theme-icon') : null;
	var label = button ? button.querySelector('.sr-only') : null;
	var preference = window.matchMedia('(prefers-color-scheme: dark)');
	var currentYear = document.getElementById('current-year');

	if (currentYear) {
		currentYear.textContent = new Date().getFullYear();
	}

	if (!button) {
		return;
	}

	function currentTheme() {
		return root.getAttribute('data-theme') || (preference.matches ? 'dark' : 'light');
	}

	function updateButton() {
		var dark = currentTheme() === 'dark';
		var text = dark ? 'Use light mode' : 'Use dark mode';

		if (icon) {
			icon.className = 'theme-icon icon solid ' + (dark ? 'fa-sun' : 'fa-moon');
		}
		if (label) {
			label.textContent = text;
		}
		button.setAttribute('aria-label', text);
		button.setAttribute('title', text);
	}

	button.addEventListener('click', function () {
		var nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';

		root.setAttribute('data-theme', nextTheme);
		try {
			window.localStorage.setItem('fiesta-theme', nextTheme);
		} catch (error) {
			// Keep the toggle working when storage is unavailable.
		}
		updateButton();
	});

	try {
		var savedTheme = window.localStorage.getItem('fiesta-theme');
		if (savedTheme === 'light' || savedTheme === 'dark') {
			root.setAttribute('data-theme', savedTheme);
		}
	} catch (error) {
		// Use the system preference when storage is unavailable.
	}

	if (preference.addEventListener) {
		preference.addEventListener('change', updateButton);
	}

	updateButton();
}());
