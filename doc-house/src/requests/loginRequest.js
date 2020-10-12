import axios from 'axios';

const loginRequest = (data) => {
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