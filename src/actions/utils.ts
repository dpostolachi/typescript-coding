const options = {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	method: 'POST',
}

// A bit of curry
export default ( url : string, data = {} ) => {
	return fetch( url, {
		...options,
		body: JSON.stringify( data )
	} )
	// Only json
	.then( resp => resp.json() )
}
