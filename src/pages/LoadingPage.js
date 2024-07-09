import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import MainLogo from '../components/MainLogo'

import checkAuthenticate from '../utils/TokenAuthenticate';

const LoadingPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const authenticationRequest = async () => {
            try {
                const isAuthenticated = await checkAuthenticate();
                
                if (isAuthenticated) {
                    navigate('/main');
                }
                else {
                    navigate('/signin');
                }
              }
            catch (error) {
                navigate('/signin');
            }
        };
        authenticationRequest();
    }, [navigate]);

    return (
      <div className='flex justify-center items-center h-screen'>
          <MainLogo />
      </div>
    )
}

export default LoadingPage;