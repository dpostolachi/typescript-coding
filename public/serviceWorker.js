/* tslint:disable */
let DB = null


// Ensuring app gets installed
addEventListener('install', function(event) {
    event.waitUntil( skipWaiting() )
});

// Claiming all clients
addEventListener('activate', function(event) {
    event.waitUntil( clients.claim() )
})

// Ensuring DB is UP before each request
const withDB = () => {
	return new Promise( ( resolve ) => {
		// resolve( )
		if ( DB === null ) {
			const request = indexedDB.open( 'probe', 3 )
			request.onsuccess = ( evt ) => {
				DB = evt.target.result
				return resolve()
			}
			request.onupgradeneeded = ( evt ) => {
				DB = evt.target.result
				merchantsStore = DB.createObjectStore( 'merchants', { autoIncrement: true } )
				bidsStore = DB.createObjectStore( 'bids', { autoIncrement: true } )
			}
		} else {
			return resolve()
		}

	} )
}

// Generating a mock response
const sendJSON = ( data ) => {
	return new Response( JSON.stringify( data ), {
		headers: new Headers( {
			"Content-Type": "application/json",
		} ),
		status: 200,
	})
}


// Saving bid
const saveBid = ( data ) => {

    return new Promise( ( resolve ) => {

        const transaction = DB.transaction( [ "bids", "merchants" ], "readwrite" )
        const merchantObjectStore = transaction.objectStore( "merchants" )
        const bidObjectStore = transaction.objectStore( "bids" )

        const { merchantId } = data

        const request = merchantObjectStore.get( merchantId )

        request.onsuccess = ( _ ) => {

            if ( request.result ) {

                const request = bidObjectStore.add( {
                    ...data,
                    dateCreated: new Date()
                } )

                request.onsuccess = ( evt ) => {
                    resolve( {
                        success: true,
                        errors: []
                    } )
                }
                request.onerror = ( event ) => {
                    resolve( {
                        success: false,
                        errors: [ {
                            field: 'unknown',
                            message: 'Something went terribly wrong',
                        } ]
                    } )
                }


            } else {
                return resolve( {
                    success: false,
                    errors: [
                        {
                            fields: 'merchantId',
                            message: 'Merchant not found'
                        }
                    ],
                } )
            }
        }

        request.onerror = ( event ) => {
            resolve( {
                success: false,
                errors: [
                    {
                        fields: 'merchantId',
                        message: 'Merchant not found'
                    }
                ],
            } )
        }

    } )
}

// Saving or updating merchant based on id
const saveMerchant = ( data ) => {
	return new Promise( ( resolve ) => {

		const transaction = DB.transaction( [ "merchants" ], "readwrite" )
		const objectStore = transaction.objectStore( "merchants" )

        const { id } = data

        if ( id ) {

            const request = objectStore.get( id )
            request.onsuccess = ( event ) => {
                const newData = {
                    ...event.target.result,
                    ...data
                }

                const updateRequest = objectStore.put( newData, id )
                updateRequest.onsuccess = ( _ ) => {
                    return resolve( {
                        success: true,
                        errors: []
                    } )
                }
                updateRequest.onerror = ( _ ) => {
                    return resolve( {
                        success: true,
                        errors: [ {
                            field: 'id',
                            message: 'Something went terrebly wrong',
                        } ]
                    } )
                }
            }
            request.onerror = ( _ ) => {
                return resolve( {
                    success: false,
                    errors: [
                        {
                            field: 'id',
                            message: 'User not found',
                        }
                    ]
                } )
            }


        } else {
            objectStore.add( data )

            transaction.oncomplete = ( evt ) => {
                resolve( {
                    success: true,
                    errors: []
                } )
            }
            transaction.onerror = ( event ) => {
                resolve( {
                    success: false,
                    errors: JSON.stringify( event )
                } )
            }
        }


	} )

}

// Get merchant bids by merchant id
const getMerchantBids = ( { id = null } ) => {

    return new Promise( ( resolve ) => {

		const transaction = DB.transaction( [ "bids" ] )

		const objectStore = transaction.objectStore( "bids" )

		const bucket = []

		objectStore.openCursor().onsuccess = ( evt ) => {

			const cursor = evt.target.result

			if ( cursor ) {
                if ( cursor.value.merchantId === id ) {
                    bucket.push( {
                        id: cursor.key,
                        ...cursor.value
                    } )
                }
                return cursor.continue()
			} else {
                return resolve( {
                    list: bucket.sort( ( a, b ) => {
                        return b.dateCreated - a.dateCreated
                    } ),
                } )
            }

		}
	} )
}


// Deleting merchant by id
const deleteMerchant = ( { id = null } ) => {
    
    return new Promise( ( resolve ) => {

        // Ensuring that all bids are deleted before merchant is
        getMerchantBids( { id } )
        .then( ( data ) => {

            const { list } = data

            Promise.all( list.map( ( bid ) => {
                const { id } = bid
                return deleteBid( { id } )
            } ) )

            .then( () => {

                const transaction = DB.transaction( [ "merchants" ], "readwrite" )
                const objectStore = transaction.objectStore( "merchants" )

                const request = objectStore.delete( id )

                request.onsuccess = () => {
                    return resolve( {
                        success: true,
                        errors: [],
                    } )
                }
                request.onerror = () => {
                    return resolve( {
                        success: false,
                        errors: [{
                            field: 'id',
                            message: 'Merchant not found'
                        }],
                    } )
                }

            } )

        } )

    } )
}

// Deleting bid by id
const deleteBid = ( { id = null } ) => {
    return new Promise( ( resolve ) => {
        const transaction = DB.transaction( [ "bids" ], "readwrite" )
        const objectStore = transaction.objectStore( "bids" )
        const request = objectStore.delete( id )
        request.onsuccess = () => {
            return resolve( {
                success: true,
                errors: [],
            } )
        }
        request.onerror = () => {
            return resolve( {
                success: false,
                errors: [{
                    field: 'id',
                    message: 'Bid not found'
                }],
            } )
        }
    } )
}

// Getting merchant by id
const getMerchant = ( { id = null } ) => {
    return new Promise( ( resolve ) => {
        const transaction = DB.transaction( [ "merchants" ] )

		const objectStore = transaction.objectStore( "merchants" )

        const request = objectStore.get( id )
        request.onsuccess = ( _ ) => {
            if ( request.result ) {
                return resolve( {
                    success: true,
                    merchant: {
                        id,
                        ...request.result,
                    }
                } )
            } else {
                return resolve( {
                    success: false,
                    merchant: null,
                } )
            }
        }

        request.onerror = ( _ ) => {
            return resolve( {
                success: false,
                merchant: null,
            } )
        }

    } )
}

// Getting a list of merchants, skip, take
const getMerchants = ( skip = 0, take = 10 ) => {

	return new Promise( ( resolve ) => {

		const transaction = DB.transaction( [ "merchants" ] )

		const objectStore = transaction.objectStore( "merchants" )

		const bucket = []

		objectStore.openCursor().onsuccess = ( evt ) => {

			const cursor = evt.target.result

			if ( skip > 0 && cursor) {
				skip-=1
				return cursor.continue()

			} else if ( take > 0 && cursor ) {
				take-=1
                const { primaryKey, value } = cursor
				bucket.push( {
                    ...value,
                    id: primaryKey,
                } )
				return cursor.continue()
			} else if ( take == 0 || ! cursor ){
				return resolve(
					new Promise( ( resolve ) => {
						const request = objectStore.count()
						request.onsuccess = () => {
							resolve( {
								list: bucket,
								count: request.result,
							} )
						}
					} )
				)
			}

		}
	} )
}

// Mocking a backend, all requests are made with POST method
addEventListener( 'fetch', event => {
	const { request: { method, url, body } } = event
	if ( method === 'POST' ) {
		const path = url.substring(url.indexOf('/',8))
		switch( path ) {
			case '/merchant/list':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( { skip, take } ) => {
						return getMerchants( skip, take )
					} )
					.then( ( data ) => {
						return sendJSON( data )
					} )
				)
			case '/merchant':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( data ) => {
						return saveMerchant( data )
					} )
					.then( ( data ) => {
						return sendJSON( data )
					} )
				)

			case '/bid':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( data ) => {
						return saveBid( data )
					} )
					.then( ( data ) => {
						return sendJSON( data )
					} )
				)

			case '/bid/delete':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( data ) => {
						return deleteBid( data )
					} )
					.then( ( data ) => {
						return sendJSON( { data: data } )
					} )
				)

			case '/merchant/one':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( data ) => {
						return getMerchant( data )
					} )
					.then( ( data ) => {
						return sendJSON( data )
					} )
				)

			case '/merchant/delete':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( data ) => {
						return deleteMerchant( data )
					} )
					.then( ( data ) => {
						return sendJSON( data )
					} )
				)
			case '/merchant/bids/list':
				return event.respondWith(
					withDB()
					.then( () => {
						return event.request.json()
					} )
					.then( ( data ) => {
						return getMerchantBids( data )
					} )
					.then( ( data ) => {
						return sendJSON( data )
					} )
				)
			default:
				return fetch( request )
		}
	}
} )
