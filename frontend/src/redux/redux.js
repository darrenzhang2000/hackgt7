import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";


const STORE_EMAIL = 'STORE_EMAIL';
const STORE_USER_PROFILE = 'STORE_USER_PROFILE'
const STORE_BANK_ACCOUNTS = 'STORE_BANK_ACCOUNTS'


const initialState = {
    email: "d",
    accounts: []
}

export function storeBankAccounts(accounts){
    console.log('store acocunts')
    return {
        type: STORE_BANK_ACCOUNTS,
        payload: {
            accounts: accounts
        }
    }
}

export function storeEmail(email){
    console.log('store user action')
    return {
        type: STORE_EMAIL,
        payload: {
            email: email,
        }
    }
}

export function storeUserProfile(profile){
    return {
        type: STORE_USER_PROFILE,
        payload: {
            profile: profile
        }
    }
}


function userReducer(state=initialState, action){
    console.log('reducer hit')
    const {payload} = action;
    switch(action.type){
        case STORE_EMAIL:
            console.log('case store email')
            return {
                ...state,
                email: payload.email,
            }
        case STORE_USER_PROFILE:
            const { firstName, lastName, dateOfBirth, university, graduationDate, degree, major } = payload.profile
            return {
                ...state,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                university: university,
                graduationDate: graduationDate,
                degree: degree,
                major: major
            }
        
        case STORE_BANK_ACCOUNTS:
            const {accounts} = payload.accounts
            return {
                ...state,
                accounts
            }

        default:
            return state
    }
}

let store = createStore(userReducer, composeWithDevTools());

export default store;