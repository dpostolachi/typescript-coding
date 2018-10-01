import { reset } from 'redux-form'
import fetch from './utils'

// Getting a merchant's bids
export const fetchMerchantBids = ( id: number ) => {

	return ( dispatch: any ) => {

		dispatch( {
			type: 'FETCH_BID_LIST_PENDING',
		} )

		return fetch( '/merchant/one', {
			id,
		} )

		.then( ( data ) => {

			const { success, merchant } = data

			if ( success ) {

				return fetch( '/merchant/bids/list', {
					id
				} )
				.then( ( bids ) => {
					const { list } = bids
					return dispatch( {
						payload: {
							list,
							merchant,
						},
						type: 'FETCH_BID_LIST_FULFILLED',
					} )

				} )
			} else {

				return dispatch( {
					type: 'FETCH_BID_LIST_NO_MERCHANT',
				} )

			}
		} )

	}


}

export const resetFormStatus = () => {

	return ( dispatch: any ) => {

		return dispatch( {
			type: 'RESET_BID_FORM_STATUS',
		} )

	}
}

// Saving a bid
export const submitBid = ( bid: object ) => {

	return ( dispatch: any ) => {

		dispatch( {
			type: 'SUBMIT_BID_PENDING',
		} )

		return fetch( '/bid', bid )

		.then( ( data ) => {

			const { success } = data

			if ( success ) {

				dispatch( {
					type: 'SUBMIT_BID_FULFILLED',
				} )

				// Reseting form
				return dispatch( reset( 'bid' ) )

			} else {

				dispatch( {
					type: 'SUBMIT_BID_REJECTED',
				} )

			}

		} )
	}

}

// Deleting a bid, return a promise to refresh the list of bids
export const deleteBid = ( id: number ) => {
	return new Promise( ( resolve ) => {
		return fetch( '/bid/delete', {
			id
		} )
		.then( ( ) => {
			resolve()
		} )
	} )
}

// Assure that merchant exists for the bid form
export const testMerchant = ( id: number ) => {

	return ( dispatch: any ) => {

		dispatch( {
			type: 'FETCH_BID_EDIT_MERCHANT_PENDING',
		} )

		return fetch( '/merchant/one', {
			id,
		} )
		.then( ( data ) => {

			if ( data.success ) {

				return dispatch( {
					type: 'FETCH_BID_EDIT_MERCHANT_FULFILLED',
				} )

			} else {

				return dispatch( {
					type: 'FETCH_BID_EDIT_MERCHANT_REJECTED',
				} )

			}

		} )
	}
}
