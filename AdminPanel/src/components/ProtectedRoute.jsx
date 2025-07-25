import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../utils/Cookies';
import { isValidAccount } from '../utils/api/account';

export const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          
          if (decoded.exp && decoded.exp * 1000 > Date.now()) {
            const ownId = getCookie("accountId");
            const accountsResponse = await isValidAccount(token, ownId);
            if (accountsResponse.status === 200) {
              setIsAuth(true);
            } 
            else {
              localStorage.removeItem('jwtToken');
              setIsAuth(false);
            }
          } 
          else {
            localStorage.removeItem('jwtToken');
            setIsAuth(false);
          }
        } 
        catch (error) {
          console.error('Invalid token or account:', error);
          localStorage.removeItem('jwtToken');
          setIsAuth(false);
        }
      } 
      else {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div className="loader">Загрузка...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};