import axios from 'axios';

// 이메일과 비밀번호로 인증하는 함수 
const SendEmail = async (email) => {
    try{
        const response = await axios.get(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/verify?email=${email}`
        );

        const data = response.data;
        return {
            status_code: data.status_code,
            msg: data.msg
        }
    }
    catch(error){
        return {
            status_code: 500,
            msg: "Please try again later."
        }
    }
}

export default SendEmail;