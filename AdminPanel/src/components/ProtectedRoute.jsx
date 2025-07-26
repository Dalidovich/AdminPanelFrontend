import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          
          if (decoded.exp && decoded.exp * 1000 > Date.now()) {            
            setIsAuth(true);
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
    return <div className="loader">Load...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};