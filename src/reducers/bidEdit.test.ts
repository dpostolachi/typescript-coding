import reducer from './bidEdit'

const FETCH_BID_EDIT_MERCHANT_PENDING = {
	type: 'FETCH_BID_EDIT_MERCHANT_PENDING',
}

const FETCH_BID_EDIT_MERCHANT_FULFILLED = {
	type: 'FETCH_BID_EDIT_MERCHANT_FULFILLED',
}

const FETCH_BID_EDIT_MERCHANT_REJECTED = {
	type: 'FETCH_BID_EDIT_MERCHANT_REJECTED',
}

const RESET_BID_FORM_STATUS = {
	type: 'RESET_BID_FORM_STATUS',
}

const SUBMIT_BID_FULFILLED = {
	type: 'SUBMIT_BID_FULFILLED',
}

const SUBMIT_BID_REJECTED = {
	type: 'SUBMIT_BID_REJECTED',
}

const SUBMIT_BID_PENDING = {
	type: 'SUBMIT_BID_PENDING',
}



describe( 'testing bid list reducer', () => {

	it( 'should return the initial state', () => {
		expect( reducer( {}, {
			type: 'UNKNOWN_ACTION'
		} ) )
		.toEqual( {} )
	} )

	it( 'should return completed => false, merchantExists => false, current => null, pending => true, before testing if merchant exists', () => {
		expect( reducer( {}, FETCH_BID_EDIT_MERCHANT_PENDING ) )
		.toEqual( {
			completed: false,
			current: null,
			merchantExists: false,
			pending: true,
		} )
	} )

	it( 'should return completed => true, merchantExists => true, pending => false, on merchant exists', () => {
		expect( reducer( {}, FETCH_BID_EDIT_MERCHANT_FULFILLED ) )
		.toEqual( {
			completed: true,
			merchantExists: true,
			pending: false,
		} )
	} )

	it( 'should return completed => true, merchantExists => false, pending => false, on merchant not found', () => {
		expect( reducer( {}, FETCH_BID_EDIT_MERCHANT_REJECTED ) )
		.toEqual( {
			completed: true,
			merchantExists: false,
			pending: false,
		} )
	} )

	it( 'should return status => null on reset form status', () => {
		expect( reducer( {}, RESET_BID_FORM_STATUS ) )
		.toEqual( {
			status: null,
		} )
	} )

	it( 'should return submitting => true before form submit', () => {
		expect( reducer( {}, SUBMIT_BID_PENDING ) )
		.toEqual( {
			submitting: true,
		} )
	} )

	it( 'should return status => "SUCCESS" on successfull submit', () => {
		expect( reducer( {}, SUBMIT_BID_FULFILLED ) )
		.toEqual( {
			status: 'SUCCESS',
			submitting: false,
		} )
	} )

	it( 'should return status => "ERROR" on unsuccessfull submit', () => {
		expect( reducer( {}, SUBMIT_BID_REJECTED ) )
		.toEqual( {
			status: 'ERROR',
			submitting: false,
		} )
	} )

} )
