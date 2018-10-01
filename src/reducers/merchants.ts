import { IAction } from './interface'

export default ( state: any, action: IAction ) => {
	switch( action.type ) {
		case 'FETCH_MERCHANTS_LIST_PENDING':
			return { ...state, pending: true, completed: false  }

		case 'FETCH_MERCHANTS_LIST_FULFILLED':
			const { payload: { list, count } } = action
			return { ...state, pending: false, completed: true, list, count  }

		default:
			return { ...state }
	}
}
