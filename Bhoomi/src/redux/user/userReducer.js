import { GET_USER, UPDATE_USER } from './userActionTypes';

// Initializing state
const initialState={
	name : '',
	phone : '',
	state: '',
	city : '',
	pinCode: ''
}

const userReducer = (state=initialState,action)=>{
	switch(action.type){
		case GET_USER :{
			// get user details - phone
			return {
				...state,
			    phone:action.phone
			}
		}
		case UPDATE_USER : {
			// update user details 
			return {
				...state,
			}

		}
		default:return state
	}
}

export default userReducer;
