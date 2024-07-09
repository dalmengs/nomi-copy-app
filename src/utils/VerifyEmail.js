import axios from 'axios';

const VerifyEmail = async (email, verification_code) => {
    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/verify`,
            {
                email: email,
                verification_code: verification_code
            }
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

export default VerifyEmail;