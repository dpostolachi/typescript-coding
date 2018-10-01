import { IStore } from './__types'

const defaultState: IStore = {
	bidEdit: {
		completed: false,
		merchantExists: false,
		pending: false,
		status: null,
		submitting: false,
	},
	bidList: {
		completed: false,
		list: [],
		merchant: null,
		pending: false,
	},
	merchantEdit: {
		completed: false,
		current: {},
		pending: false,
		status: null,
		submitting: false,
	},
	merchants: {
		completed: false,
		count: 0,
		list: [],
		pending: false,
	},
}

export default defaultState
