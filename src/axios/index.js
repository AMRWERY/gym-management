import axios from 'axios'

export default axios.create({
    baseURL: import.meta.env.VITE_APP_ENV == "production" ? 'http://plat-gym-api.devlov.com/api/admin/' : import.meta.env.VITE_APP_ENV == "staging" ? 'http://plat-gym-api.devlov.com/api/admin/' : 'http://gym-managemnt.com/api/admin/',
    headers: {
        'locale': localStorage.getItem("currentLang"),
        'Apikey': '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'branchId':
        localStorage.getItem("selectedBranch") != null
        ? JSON.parse(localStorage.getItem("selectedBranch")).id
        : "",
        'Authorization':
        localStorage.getItem("userInfo") != null
        ? "Bearer " + JSON.parse(localStorage.getItem("userInfo"))?.token
        : "",
    }
})