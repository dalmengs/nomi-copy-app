import React, { useEffect, useState }  from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import { useLocation } from 'react-router-dom';

import checkAuthenticate from '../utils/TokenAuthenticate';

const PrivateRoute = () => {
    const [authentication, setAuthentication] = useState(null);
    const location = useLocation();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const authenticationResult = await checkAuthenticate();
          if(authenticationResult) setAuthentication(authenticationResult);
        }
        catch (error) {
        }
      };
  
      fetchData();
    }, [location]);
  
    if (authentication === null) {
      return null;
    }
  
    return authentication ? (
      <UserProvider value={authentication}>
        <Outlet />
      </UserProvider>
    ) : (
      <Navigate to="/signin" />
    );
  };

export default PrivateRoute;
