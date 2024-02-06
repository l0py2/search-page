'use strict'

const cacheName = 'search-page-0.1.0';

self.addEventListener('install', event => {
	event.waitUntil(
		addResourcesToCache([
			'./',
			'./index.html',
			'./styles/main.css',
			'./styles/index.css',
			'./scripts/main.js'
		])
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(getResponse(event.request));
});

async function addResourcesToCache(resources) {
	const cache = await caches.open(cacheName);

	return cache.addAll(resources);
}

function getResponse(request) {
	const cacheResponse = caches.match(request)

	if(cacheResponse) {
		return cacheResponse;
	}

	return fetch(request);
}
