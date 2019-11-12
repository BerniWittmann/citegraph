import Axios from 'axios'

Axios.defaults.baseURL = process.env.VUE_APP_API_LOCATION
Axios.defaults.headers.common.Accept = 'application/json'
