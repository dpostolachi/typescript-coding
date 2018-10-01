import reducer from './bidList'

const FETCH_BID_LIST_RESET = {
	type: 'FETCH_BID_LIST_RESET',
}

const FETCH_BID_LIST_PENDING = {
	type: 'FETCH_BID_LIST_PENDING',
}

const FETCH_BID_LIST_NO_MERCHANT = {
	type: 'FETCH_BID_LIST_NO_MERCHANT',
}


const FakeMerchant = {
	email: 'someemail@mail.com',
	firstName: 'Some',
	hasPremium: false,
	id: 3,
	lastName: 'One',
}

const FakeBid = {
	amount: 333,
	carTitle: 'Batmobile',
	id: 1,
}

const FETCH_BID_LIST_FULFILLED = {
	payload: {
		list: [
			FakeBid,
		],
		merchant: FakeMerchant,
	},
	type: 'FETCH_BID_LIST_FULFILLED',
}



describe( 'testing bid list reducer', () => {

	it( 'should return the initial state', () => {
		expect( reducer( {}, {
			type: 'UNKNOWN_ACTION'
		} ) )
		.toEqual( {} )
	} )

	it( 'should return completed => false, merchant => null, pending => true, before testing if merchant exists', () => {
		expect( reducer( {}, FETCH_BID_LIST_PENDING ) )
		.toEqual( {
			completed: false,
			merchant: null,
			pending: true,
		} )
	} )

	it( 'should return completed => false, merchant => null, pending => false, on list reset', () => {
		expect( reducer( {}, FETCH_BID_LIST_RESET ) )
		.toEqual( {
			completed: false,
			list: [],
			merchant: null,
			pending: false,
		} )
	} )

	it( 'should return completed => true, merchant => null, pending => false, on merchant not found', () => {
		expect( reducer( {}, FETCH_BID_LIST_NO_MERCHANT ) )
		.toEqual( {
			completed: true,
			list: [],
			merchant: null,
			pending: false,
		} )
	} )

	it( 'should return completed => true, merchant => { data }, list => [ data ] pending => false, on merchant\'s bids successfully fetched', () => {
		expect( reducer( {}, FETCH_BID_LIST_FULFILLED ) )
		.toEqual( {
			completed: true,
			list: [ FakeBid ],
			merchant: FakeMerchant,
			pending: false,
		} )
	} )


} )
