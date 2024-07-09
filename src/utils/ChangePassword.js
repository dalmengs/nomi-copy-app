import axios from 'axios';

const ChangePassword = async (email, current_password, new_password) => {
    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/password/change`,
            {
                email: email,
                current_password: current_password,
                new_password: new_password
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

export default ChangePassword