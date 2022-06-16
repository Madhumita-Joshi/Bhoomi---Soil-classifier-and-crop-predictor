import {GET_USER,UPDATE_USER} from './userActionTypes';


// Action functions which return action type
// and optional payLoad to burgerReducer

export const getUserDetails =(phone)=>{
	return{
		type:GET_USER,
		phone: phone
	}
}

export const updateUserDetails = (payload)=>{
	return{
		type:UPDATE_USER,
		payload:payload
	}
}
