import axios from 'axios';

const SendPasswordEmail = async (email) => {
    try{
        const response = await axios.get(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/password/change?email=${email}`
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

export default SendPasswordEmail;