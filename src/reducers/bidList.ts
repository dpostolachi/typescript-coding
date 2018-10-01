import { IAction } from './__interface'

export default ( state: any, action: IAction ) => {
	switch( action.type ) {
		case 'FETCH_BID_LIST_PENDING':
			return { ...state, merchant: null, pending: true, completed: false  }

		case 'FETCH_BID_LIST_RESET':
			return { ...state, merchant: null, pending: false, completed: false, list: []  }

		case 'FETCH_BID_LIST_NO_MERCHANT':
			return { ...state, merchant: null, pending: false, completed: true, list: []  }

		case 'FETCH_BID_LIST_FULFILLED':
			const { payload: { merchant, list } } = action
			return { ...state, merchant, pending: false, completed: true, list  }

		default:
			return { ...state }
	}
}
