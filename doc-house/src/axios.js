import axios from 'axios';

const BASE_URL_DEV='http://localhost:5000'
const BASE_URL_PROD='https://doc-house.herokuapp.com'

const baseUrl = process.env.NODE_ENV === "production"
? BASE_URL_PROD : BASE_URL_DEV

const instance = axios.create({
    baseURL: baseUrl
})

export default instance;