const CACHE_NAME = 'jeu-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',     // Mettez ici le nom de VOTRE fichier CSS
  './script.js',     // Mettez ici le nom de VOTRE fichier JS du jeu
  './manifest.json',
  './icon-192.png'   // Il faut une icône, sinon ça peut bloquer
];

// Installe le jeu dans la mémoire du téléphone
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Sert le jeu depuis la mémoire, même sans internet
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
