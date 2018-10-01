import reducer from './merchantEdit'

const FakeMerchant = {
	email: 'someemail@mail.com',
	firstName: 'Some',
	hasPremium: false,
	id: 3,
	lastName: 'One',
}

const FETCH_MERCHANT_EDIT_PENDING = {
	type: 'FETCH_MERCHANT_EDIT_PENDING',
}

const FETCH_MERCHANT_EDIT_FULFILLED = {
	payload: {
		merchant: FakeMerchant
	},
	type: 'FETCH_MERCHANT_EDIT_FULFILLED',
}

const FETCH_MERCHANT_EDIT_REJECTED = {
	type: 'FETCH_MERCHANT_EDIT_REJECTED',
}

const SUBMIT_MERCHANT_FULFILLED = {
	type: 'SUBMIT_MERCHANT_FULFILLED',
}

const SUBMIT_MERCHANT_REJECTED = {
	type: 'SUBMIT_MERCHANT_REJECTED',
}

const RESET_MERCHANT_FORM_STATUS = {
	type: 'RESET_MERCHANT_FORM_STATUS',
}

const RESET_MERCHANT_FORM = {
	type: 'RESET_MERCHANT_FORM',
}

describe( 'testing merchants edit reducer', () => {

	it( 'should return the initial state', () => {
		expect( reducer( {}, {
			type: 'UNKNOWN_ACTION'
		} ) )
		.toEqual( {} )
	} )

	it( 'should set pending => true, completed => false, current => { empty object } when fetching merchant for edit', () => {
		expect( reducer( {}, FETCH_MERCHANT_EDIT_PENDING ) )
		.toEqual( {
			completed: false,
			current: {},
			pending: true,
		} )
	} )

	it( 'should set pending => true, completed => false, current => { data } when merchant successfully fetched for edit', () => {
		expect( reducer( {}, FETCH_MERCHANT_EDIT_FULFILLED ) )
		.toEqual( {
			completed: true,
			current: FakeMerchant,
			pending: false,
		} )
	} )

	it( 'should set pending => false, completed => true, current => { empty object } when merchant unsuccessfull fetched for edit', () => {
		expect( reducer( {}, FETCH_MERCHANT_EDIT_REJECTED ) )
		.toEqual( {
			completed: true,
			current: {},
			pending: false,
		} )
	} )

	it( 'should set status => "ERROR" on unsuccessfull submitting of merchant', () => {
		expect( reducer( {}, SUBMIT_MERCHANT_REJECTED ) )
		.toEqual( {
			status: 'ERROR',
			submitting: false,
		} )
	} )

	it( 'should set status => "SUCCESS" on successfull submitting of merchant', () => {
		expect( reducer( {}, SUBMIT_MERCHANT_FULFILLED ) )
		.toEqual( {
			status: 'SUCCESS',
			submitting: false,
		} )
	} )

	it( 'should set status => null on status reset', () => {
		expect( reducer( {}, RESET_MERCHANT_FORM_STATUS ) )
		.toEqual( {
			status: null,
		} )
	} )

	it( 'should set current => { empty object } completed => false pending => false on form reset', () => {
		expect( reducer( {}, RESET_MERCHANT_FORM ) )
		.toEqual( {
			completed: false,
			current: {},
			pending: false,
		} )
	} )


} )
