import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import MainLogo from '../components/MainLogo'

import SignInField from '../components/SignInField'
import ForgotPasswordButton from '../components/ForgotPasswordField';
import SignUpButton from '../components/SignUpTag';

const SignInPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const msg = location.state?.msg || "";

    useEffect(() => {
        localStorage.setItem('daly_authentication_token', "");
        if (location.state?.msg) {
            navigate('/signin', { state: { msg: "" } });
        }
    }, []);

    const formatMessage = (message) => {
        return message.split('\n').map((str, index) => (
            <p key={index} className="text-red-500 text-center">
            {str}
            </p>
        ));
    };

    return (
        <div>
            <MainLogo />
            <SignInField />
            <div className='mt-[20px]'>
                {msg && formatMessage(msg)}
            </div>
            <div className='flex justify-center space-x-4 mt-4'>
                <SignUpButton /> | <ForgotPasswordButton />
            </div>
        </div>
    )
}

export default SignInPage;