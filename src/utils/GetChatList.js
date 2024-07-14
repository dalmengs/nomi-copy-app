import axios from 'axios';

const FindChatList = async (user_id) => {

    try{
        const response = await axios.get(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/daly?user_id=${user_id}`
        );

        const data = response.data;
        return data;
    }
    catch(error){
        return {
            "status_code": 500,
            "msg": "Faliled",
            "data": null
        };
    }
}

export default FindChatList;