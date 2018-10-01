import reducer from './merchants'

const FakeMerchant = {
	email: 'someemail@mail.com',
	firstName: 'Some',
	hasPremium: false,
	id: 3,
	lastName: 'One',
}

const FETCH_MERCHANTS_LIST_PENDING = {
	type: 'FETCH_MERCHANTS_LIST_PENDING',
}

const FETCH_MERCHANTS_LIST_FULFILLED = {
	payload: {
		count: 1,
		list: [ FakeMerchant ],
	},
	type: 'FETCH_MERCHANTS_LIST_FULFILLED',
}



describe( 'testing merchants reducer', () => {

	it( 'should return the initial state', () => {
		expect( reducer( {}, {
			type: 'UNKNOWN_ACTION'
		} ) )
		.toEqual( {} )
	} )

	it( 'should set pending => true completed => false before request', () => {
		expect( reducer( {}, FETCH_MERCHANTS_LIST_PENDING ) )
		.toEqual( {
			completed: false,
			pending: true,
		} )
	} )

	it( 'should set pending => false completed => true list => [data] count => total_count on fulfilled', () => {
		expect( reducer( {}, FETCH_MERCHANTS_LIST_FULFILLED ) )
		.toEqual( {
			completed: true,
			count: 1,
			list: [ FakeMerchant ],
			pending: false,
		} )
	} )

} )
