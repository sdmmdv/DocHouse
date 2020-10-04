import axios from 'axios';

const loginRequest = (email, password) => {
    return axios({
    method: 'post',
    url: 'http://localhost:9000/users/add',
    data: {... data}
    })
    .then(response => {
        return response.data
    }, error => {
        console.log(error);
    });
}

export default loginRequest;