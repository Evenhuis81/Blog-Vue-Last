import Axios from "axios"
Axios.interceptors.request.use(config => {
    /**
     * Here we will fecth the token from local storage and 
     * attach it (if exists) to the Authorization header on EVERY request.
     */
    let token = window.localStorage.getItem('token')

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }

    return config

},
    function (error) {
        return Promise.reject(error)
    })
