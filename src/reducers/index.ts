import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import bidEdit from './bidEdit'
import bidList from './bidList'
import merchantEdit from './merchantEdit'
import merchants from './merchants'

export default combineReducers( {
	bidEdit,
	bidList,
	form: formReducer,
	merchantEdit,
	merchants,
} )
