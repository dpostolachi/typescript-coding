import { IAction } from './interface'

export default ( state: any, action: IAction ) => {
	switch( action.type ) {
		case 'FETCH_BID_EDIT_MERCHANT_PENDING':
			return { ...state, merchantExists: false, current: null, pending: true, completed: false  }

		case 'FETCH_BID_EDIT_MERCHANT_FULFILLED':
			return { ...state, merchantExists: true, pending: false, completed: true  }

		case 'FETCH_BID_EDIT_MERCHANT_REJECTED':
			return { ...state, merchantExists: false, pending: false, completed: true  }

		case 'SUBMIT_BID_PENDING':
			return { ...state, submitting: true }

		case 'RESET_BID_FORM_STATUS':
			return { ...state, status: null }

		case 'SUBMIT_BID_FULFILLED':
			return { ...state, submitting: false, status: 'SUCCESS'  }

		case 'SUBMIT_BID_REJECTED':
			return { ...state, submitting: false, status: 'ERROR'  }

		default:
			return { ...state }
	}
}
