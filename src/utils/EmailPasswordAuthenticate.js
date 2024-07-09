import axios from 'axios';

// 이메일과 비밀번호로 인증하는 함수 
const EmaliPasswordAuthenticate = async (email, password) => {
    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/authentication`,
            { email: email, password: password }
        );

        const data = response.data;
        if (data.status_code === 200) {
            localStorage.setItem('daly_authentication_token', data.data.token);
        }
        return data.status_code;
    }
    catch(error){
        return 500;
    }
}

export default EmaliPasswordAuthenticate;