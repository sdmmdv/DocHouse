import axios from 'axios';

const getDoctorProfileRequest = (fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.151:8080/auth/fixerProfile',
    data: {
        fixerId: fixerId
    }
    })
    .then(response => {
        return response.data.fixer;
    }, error => {
        console.log(error);
    });
}

export default getDoctorProfileRequest;