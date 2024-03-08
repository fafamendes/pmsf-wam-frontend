import { useEffect } from 'react';
import './App.css';

import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '@context/index';

import { useUserContext } from '@context/UserContext';
import { AdminRoutes } from '@routes/AdminRoutes';
import { UserRoutes } from '@routes/UserRoutes';
import { Header } from '@layouts/header/Header';

function App() {
  const { token } = useTokenContext();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    !token && navigate('/login');
  }, [navigate, token])

  return (
    <>
      <Header />
      {
        user?.role === 'ADMIN' ? (
          <AdminRoutes />
        ) : (
          <UserRoutes />
        )}
    </>
  );
}

export default App;
