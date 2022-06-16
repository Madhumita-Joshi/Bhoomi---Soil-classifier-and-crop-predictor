import {createStore,combineReducers} from 'redux';

import userReducer from './user/userReducer';

const rootReducer=combineReducers({
	userReducer:userReducer
})

// Passing rootReducer to createStore
const store=createStore(rootReducer);

export default store;