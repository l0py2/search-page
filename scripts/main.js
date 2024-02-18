'use strict'

registerServiceWorker();

const searchEngines = new Map([
	['duckduckgo', 'https://duckduckgo.com'],
	['google', 'https://www.google.com/search'],
	['archwiki', 'https://wiki.archlinux.org/index.php'],
	['wikipedia', 'https://en.wikipedia.org/w/index.php']
]);

const searchParameters = new Map([
	['duckduckgo', 'q'],
	['google', 'q'],
	['archwiki', 'search'],
	['wikipedia', 'search']
]);

const searchEngineOption = document.querySelector('#search-engine');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

const storageSearchEngine = localStorage.getItem('preferredSearchEngine');

if(storageSearchEngine) {
	searchEngineOption.value = storageSearchEngine;
	searchForm.setAttribute('action', searchEngines.get(storageSearchEngine));
	searchInput.setAttribute('name', searchParameters.get(storageSearchEngine));
}else {
	localStorage.setItem('preferredSearchEngine', 'duckduckgo');
}

searchEngineOption.addEventListener('input', event => {
	const option = event.target.value;

	localStorage.setItem('preferredSearchEngine', option);

	searchForm.setAttribute('action', searchEngines.get(option));
	searchInput.setAttribute('name', searchParameters.get(option));
});

async function registerServiceWorker() {
	if('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('service_worker.js', {
				scope: './'
			});
		}catch(error) {
			console.error(`Service worker registration: ${error}`);
		}
	}
}
