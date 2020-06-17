import axios from '../config/axios'

export const setUser = (formData) => {
    return {type: 'SET_USER', payload: formData}
}

export const startLoginUser = (formData, redirect) => {
    return (dispatch)=> {
        axios.post('users/login', formData)
            .then(response=>{
                alert('Log in Success!')
                localStorage.setItem('authToken', response.data.token)
                dispatch(setUser(formData))
                redirect()
            })
            .catch(err=>{
                alert(err)
            })
    }
}

export const startRegisterUser = (formData, redirect) => {
    return (dispatch)=>{
        axios.post('/users/register', formData)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            }
            else {
                alert('Register Success')
                redirect()
            }
        })
        .catch(err=>{
            alert(err.message)
        })
    }
}
export const startGetUser = (token) => {
    return (dispatch) => {
        axios.get('/users/account', {
            headers: {
                "x-auth": token
            }
        })
        .then(response=>{
            dispatch(setUser(response.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
export const startUserLogout = () => {
    return (dispatch)=>{
        axios.delete('/users/logout', {
            headers: {
                "x-auth": localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                alert(response.data.notice)
                localStorage.removeItem('authToken')
                dispatch(setUser({}))
                window.location.href = '/login'
            })
            .catch()
    }
}