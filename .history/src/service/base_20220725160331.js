import axios from 'axios'

const baseURL = '/'
axios.defaults.baseURL=baseURL

export function get(url,params){
    return axios.get(url,{
        params
    })
}