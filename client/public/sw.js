importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')

self.skipWaiting()
const revision = Date.now().toString().substr(8,12)

workbox.setConfig({debug: false})
workbox.core.setCacheNameDetails({
    prefix: 'kosku',
    suffix: 'v1',
    precache: 'app'
})

workbox.precaching.precacheAndRoute([
    {url: '/', revision},
    {url: '/manifest.json', revision},
    {url: '/icons/logo-192.png', revision}
])

workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('static'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'kosku-assets',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 10
            })
        ]
    })
)