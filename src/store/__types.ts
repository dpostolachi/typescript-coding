type Bid = Readonly<{
	id: string
	carTitle: string
	amount: number
	created: string
}>

type Merchant = Readonly<{
	id?: string
	firtName: string
	lastName: string
	avatarUrl: string,
	email: string
	phone: string
	hasPremium: boolean,
	bids: ReadonlyArray<Bid[]>
}>

export interface IStore {
	bidEdit: {
		completed: boolean,
		merchantExists: boolean,
		pending: boolean,
		submitting: false,
		status: string | null,
	},
	bidList: {
		completed: boolean,
		list: ReadonlyArray<Bid[]>,
		merchant: Merchant | null,
		pending: boolean,
	},
	merchants: {
		list: ReadonlyArray<Merchant[]>,
		pending: boolean,
		completed: boolean,
		count: number,
	},
	merchantEdit: {
		completed: boolean,
		current: Merchant | object,
		pending: boolean,
		submitting: false,
		status: string | null,
	},
}
