import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    SIGNUP_SUCCESS, SIGNUP_REQUEST, SIGNUP_FAILURE, COMMON_ERROR, CLEAR_ERROR
} from '../action/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default ( state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem( 'token' ) ? true : false,
    token: '',
    errorMessage: [],
    modalState: false
}, action ) => {
    switch ( action.type ) {
        case LOGIN_REQUEST:
            return Object.assign( {}, state, {
                isFetching: true,
                isAuthenticated: false,
            } )
        case LOGIN_SUCCESS:
            //console.log(action)
            return Object.assign( {}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''

            } )
        case LOGIN_FAILURE:
            //console.log(action.message.data)
            return Object.assign( {}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message.data
            } )
        case LOGOUT_SUCCESS:
            return Object.assign( {}, state, {
                isFetching: true,
                isAuthenticated: false
            } )
        case SIGNUP_REQUEST:
            return Object.assign( {}, state, {
                isFetching: true,
                isAuthenticated: false,
            } )
        case SIGNUP_SUCCESS:

            return Object.assign( {}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''

            } )
        case SIGNUP_FAILURE:
            //console.log(action.message)
            return Object.assign( {}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            } )
        case COMMON_ERROR:
            //console.log(action.message)
            return Object.assign( {}, state, {
                errorMessage: action.message,
                modalState: 'true'
            } )
        case CLEAR_ERROR:
            console.log( 'clearError' )
            return Object.assign( {}, state, {
                errorMessage: [],
                modalState: false
            } )
        default:
            return state
    }
}
