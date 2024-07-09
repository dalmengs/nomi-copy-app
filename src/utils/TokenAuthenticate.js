import axios from 'axios';

// 토큰으로 인증하는 함수 
const TokenAuthenticate = async () => {
    const token = localStorage.getItem('daly_authentication_token');
    
    if(!token) return false;

    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/authentication`,
            { token: token }
        );

        const data = response.data;
        if (data.status_code === 200) {
            localStorage.setItem('daly_authentication_token', data.data.token);
            return true;
        }
        else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}

export default TokenAuthenticate;