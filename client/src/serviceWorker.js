// Register the service worker

const isLocalhost = Boolean (
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match (
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const publicURL = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicURL.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            const serviceWorkerURL = `${process.env.PUBLIC_URL}/service-worker.js`;

            // Runs on localhost
            if (isLocalhost) {
                // Validate if it exists
                ValidateServiceWorker(serviceWorkerURL, config);

                // Additional logging
                navigator.serviceWorker.ready.then(() => {
                    console.log (
                        'Service Worker caching application'
                    );
                });
            } else {
                // Register the service worker
                registerServiceWorker(serviceWorkerURL, config);
            }
        });
    }
}

function registerServiceWorker(serviceWorkerURL, config) {
    navigator.serviceWorker
        .register(serviceWorkerURL)
        .then( registerSW => {
            registerSW.onupdatefound = () => {
                const installWorker = registerSW.installing;
                if (installWorker === null) {
                    return;
                }
                installWorker.onstatechange = () => {
                    if (installWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // Callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registerSW);
                            }
                        } else {
                            console.log('Successfully cached content for offline use!');

                            if (config && config.onSuccess) {
                                config.onSuccess(registerSW);
                            }
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.log('There was an error trying to register the service worker:', error);
        });
}

function ValidateServiceWorker(serviceWorkerURL, config) {
    // Try to locate service worker
    fetch(serviceWorkerURL, {
        headers: { 'Service-Worker': 'script' },
    })
    then(response => {
        const contentType = response.headers.get('content-type');
        if (
            response.status === 404 ||
            ( contentType != null && contentType.indexOf('javascript') === -1 )
        ) {
            navigator.serviceWorker.ready.then(registerSW => {
                registerSW.unregister().then(() => {
                    window.location.reload();
                });
            });
        } else {
            // Unless there are any issues above, run the register function
            registerServiceWorke(serviceWorkerURL, config);
        }
    })
    .catch(() => {
        console.log (
            'Internet connection slow or not connected, running in offline mode.'
        );
    });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registerSW => {
                registerSW.unregister();
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}