import axios from 'axios';

const DeleteUser = async (user_id) => {

    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/user/delete`,
            { user_id: user_id }
        );

        const data = response.data;
        return {
            "status_code": data.status_code
        };
    }
    catch(error){
        return {
            "status_code": 500
        };
    }
}

export default DeleteUser;