import { IAction } from './interface'

export default ( state: any , action: IAction ) => {
	switch( action.type ) {
		case 'FETCH_MERCHANT_EDIT_PENDING':
			return { ...state, current: {}, pending: true, completed: false  }

		case 'FETCH_MERCHANT_EDIT_FULFILLED':
			const { payload: { merchant } } = action
			return { ...state, pending: false, completed: true, current: merchant  }

		case 'FETCH_MERCHANT_EDIT_REJECTED':
			return { ...state, pending: false, completed: true, current: {}  }

		case 'SUBMIT_MERCHANT_PENDING':
			return { ...state, submitting: true  }

		case 'SUBMIT_MERCHANT_FULFILLED':
			return { ...state, submitting: false, status: 'SUCCESS'  }

		case 'SUBMIT_MERCHANT_REJECTED':
			return { ...state, submitting: false, status: 'ERROR'  }

		case 'RESET_MERCHANT_FORM_STATUS':
			return { ...state, status: null  }

		case 'RESET_MERCHANT_FORM':
			return { ...state, current: {}, pending: false, completed: false  }

		default:
			return { ...state }
	}
}
