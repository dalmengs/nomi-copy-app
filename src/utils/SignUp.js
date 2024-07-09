import axios from 'axios';


const SignUp = async (email, password, username, birth, gender) => {
    try{
        const response = await axios.post(
            `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/user`,
            { 
                email: email,
                password: password,
                username: username,
                user_information: {
                    birth: birth,
                    gender: gender
                }
            }
        );

        const data = response.data;
        console.log(data)
        if (data.status_code === 200) {
            const response2 = await axios.post(
                `http://${process.env.REACT_APP_AUTH_IP}:${process.env.REACT_APP_AUTH_PORT}/api/v1/token`,
                { 
                    user_id: data.data.user_id
                }
            );

            const data2 = response2.data;
            console.log(data2)
            if(data2.status_code === 200){
                localStorage.setItem('daly_authentication_token', data2.data.token);
            }
            return data.status_code;
        }
        return data.status_code;
    }
    catch(error){
        return 500;
    }
}

export default SignUp;