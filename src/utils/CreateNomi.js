import axios from 'axios';

const CreateNomi = async (user_id, name, personalities, interests, relationship, gender) => {

    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_RAG_IP}:${process.env.REACT_APP_RAG_PORT}/api/v1/daly`,
            {
                user_id: user_id,
                name: name,
                personalities: personalities,
                interests: interests,
                relationship: relationship,
                gender: gender
            }
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

export default CreateNomi;