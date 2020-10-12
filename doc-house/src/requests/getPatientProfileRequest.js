import axios from 'axios';

const getPatientProfileRequest = (userId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.151:8080/auth/profile',
    data: {
        userId: userId
    }
    })
    .then(response => {
        return response.data.user;
    }, error => {
        console.log(error);
    });
}

export default getPatientProfileRequest;