import React, { useEffect, useState }  from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import checkAuthenticate from '../utils/TokenAuthenticate';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const isAuthenticated = await checkAuthenticate();
          setIsAuthenticated(isAuthenticated);
        }
        catch (error) {
          setIsAuthenticated(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (isAuthenticated === null) {
      return null;
    }
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
  };

export default PrivateRoute;
