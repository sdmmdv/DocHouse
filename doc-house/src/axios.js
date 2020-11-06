import axios from 'axios';

//define base URL
const instance = axios.create({
    baseURL: "http://localhost:5000",
})

export default instance;