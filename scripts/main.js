const searchEngines = new Map();
searchEngines.set('duckduckgo', 'https://duckduckgo.com');
searchEngines.set('google', 'https://www.google.com/search');

const searchEngineOption = document.querySelector('#search-engine');
const searchForm = document.querySelector('#search-form');

const storageSearchEngine = localStorage.getItem('preferredSearchEngine');

if(storageSearchEngine) {
	searchEngineOption.value = storageSearchEngine;
	searchForm.setAttribute('action', searchEngines.get(storageSearchEngine));
}else {
	localStorage.setItem('preferredSearchEngine', 'duckduckgo');
	searchForm.setAttribute('action', searchEngines.get('duckduckgo'));
}

searchEngineOption.addEventListener('input', event => {
	const option = event.target.value;

	localStorage.setItem('preferredSearchEngine', option);

	searchForm.setAttribute('action', searchEngines.get(option));
});
