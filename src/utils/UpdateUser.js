import axios from 'axios';

const UpdateUser = async (user_id, username, birth, gender) => {

    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/user/update`,
            { user_id: user_id, username: username, birth: birth, gender: gender }
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

export default UpdateUser;