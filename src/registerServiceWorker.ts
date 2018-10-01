export default () => {
	return new Promise( ( resolve ) => {
		if ( navigator.serviceWorker.controller ) {
			resolve()
		}
		navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' } )
		.then( () => {
			// I know this is bad, but app needs an active serviceWorker to work as a backend api
			if ( !navigator.serviceWorker.controller ) {
				location.reload()
			}
		} )
	} )
}
