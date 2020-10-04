import axios from 'axios';

const patientRegisterRequest = (data) => {
    console.log(data);
    return axios({
    method: 'post',
    // url: 'http://192.168.0.151:8080/auth/signup',
    url: 'http://localhost:9000/users/add',
    data: {...data}
    // data: {
    //     email: data.email,
    //     password: data.password,
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    // }

    })
    .then(response => {
        if (response.data.userId){
            return response.data.userId;
        }
    }, error => {
        console.log(error);
    });
}

export default patientRegisterRequest;