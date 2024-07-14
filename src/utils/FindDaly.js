import axios from 'axios';

const FindDaly = async (daly_id) => {

    try{
        const response = await axios.get(`http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/daly/id?daly_id=${daly_id}`);

        const data = response.data;
        console.log(data)
        return data;
    }
    catch(error){
        return {
            "status_code": 500,
            "data": null,
            "msg": "Failed"
        };
    }
}

export default FindDaly;