import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../reducers'
import defaultState from './default'

const configureStore = ( initialState?: object ) => {
	return createStore( reducers, initialState!, applyMiddleware( ReduxThunk ) )
}

const Store = configureStore( defaultState )

export default Store
