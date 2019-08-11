import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart = () => {
    return{
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken,userId) => {
    console.log('++EXP authorized')
    return{
        type: actionTypes.AUTH_SUCCESS,
        //authData : authData 
        idToken : idToken,
        userId :userId

    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogOut =() =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{ 
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
                dispatch(authLogOut())
        },expiresIn*1000 );
    }
}

export const auth = (email,password,signUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBxpuI-CdzpwGukHSeiEyUPrhZt-2a9pq4'
        if(!signUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBxpuI-CdzpwGukHSeiEyUPrhZt-2a9pq4'
        }
        axios.post(url,authData)
            .then(response=>{
                console.log(response)
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate)
                localStorage.setItem('userId',response.data.localId)
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error.response.data.error)) 
            })
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogOut())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate < new Date()){
                dispatch(authLogOut())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
               
                dispatch(checkAuthTimeout( expirationDate.getTime() - new Date().getTime()/1000))
            }
        }
    }
}