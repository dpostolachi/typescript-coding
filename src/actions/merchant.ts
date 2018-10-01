import { reset } from 'redux-form'
import fetch from './utils'

// Saving or updating merchant
export const submitMerchant = ( merchant: any ) => {

	return ( dispatch: any ) => {

		dispatch( {
			type: 'SUBMIT_MERCHANT_PENDING',
		} )

		return fetch( '/merchant', merchant )
		.then( ( data ) => {

			const { success } = data
			const { id } = merchant

			if ( success ) {
				dispatch( {
					type: 'SUBMIT_MERCHANT_FULFILLED',
				} )
			} else {
				dispatch( {
					type: 'SUBMIT_MERCHANT_REJECTED',
				} )

			}


			if ( success && !id ){

				// Reseting form on saving new merchant
				return resetMerchantEdit()( dispatch )
			}

		} )
	}
}

// Getting a list of merchants
export const fetchMerchants = ( skip = 0, take = 10 ) => {
	return ( dispatch: any ) => {
		dispatch( {
			type: 'FETCH_MERCHANTS_LIST_PENDING'
		} )
		return fetch( '/merchant/list', {
			skip,
			take
		} )
		.then( ( data : any ) => {
			return dispatch( {
				payload: data,
				type: 'FETCH_MERCHANTS_LIST_FULFILLED',
			} )
		} )
	}
}

export const resetFormStatus = () => {
	return ( dispatch: any ) => {
		return dispatch( {
			type: 'RESET_MERCHANT_FORM_STATUS',
		} )
	}
}

// Reseting merchant form
export const resetMerchantEdit = () => {
	return ( dispatch: any ) => {
		dispatch( {
			type: 'RESET_MERCHANT_FORM',
		} )
		return dispatch( reset( 'merchant' ) )
	}
}


// Deleting a merchant
export const deleteMerchant = ( id: number ) => {
	return ( dispatch: any ) => {
		return new Promise( ( resolve, reject ) => {
			return fetch( '/merchant/delete', { id } )
			.then( ( data ) => {
				const { success } = data
				if ( success ) {
					resolve()
				} else {
					reject()
				}
			} )
		} )
	}
}

// Getting merchant's data for edditing
export const fetchMerchantsEdit = ( id : number ) => {

	return ( dispatch: any ) => {

		dispatch( {
			type: 'FETCH_MERCHANT_EDIT_PENDING'
		} )

		return fetch( '/merchant/one', {
			id
		} )
		.then( ( data : any ) => {

			const { success } = data

			if ( success ) {

				return dispatch( {
					payload: data,
					type: 'FETCH_MERCHANT_EDIT_FULFILLED',
				} )

			} else {

				return dispatch( {
					payload: data,
					type: 'FETCH_MERCHANT_EDIT_REJECTED',
				} )

			}

		} )
	}
}

// Get a single merchant for bids list
export const fetchMerchant = ( id: number ) => {

	return new Promise( ( resolve, reject ) => {

		return fetch( '/merchant/one', {
			id
		} )
		.then( ( data : any ) => {

			const { success, merchant } = data
			if ( success ) {
				return resolve( {
					merchant
				} )
			} else {
				return reject( null )
			}
		} )

	} )
}
