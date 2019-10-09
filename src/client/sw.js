(function () {
  if (navigator && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: '/' })
      .then(() => console.log('Service Worker registered successfully...'))
      .catch(error => console.log('Service Worker registration failed:', error))
  } else {
    console.warn('Service worker is not supported; please update your browser.')
  }
})()
