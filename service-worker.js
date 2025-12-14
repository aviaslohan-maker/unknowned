const CACHE_NAME = 'slide-puzzle-v1';
// Liste de tous les fichiers nécessaires au fonctionnement (HTML, CSS, JS, Manifest)
const urlsToCache = [
    '/', // L'index principal
    '/index.html',
    '/service-worker.js', // Le service worker lui-même
    '/manifest.json' 
    // Si vous aviez des images ou des polices personnalisées, elles iraient ici
];

// Installation du Service Worker et mise en cache des ressources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Ouverture du cache et ajout des ressources');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interception des requêtes et service des ressources depuis le cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la ressource est dans le cache, on la sert
                if (response) {
                    return response;
                }
                // Sinon, on effectue une requête réseau normale
                return fetch(event.request);
            })
    );
});

// Nettoyage des anciens caches (si vous mettez à jour CACHE_NAME)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});