import { useEffect } from 'react';
import './App.css';

import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '@context/index';

import { useUserContext } from '@context/UserContext';
import { AdminRoutes } from '@routes/AdminRoutes';
import { UserRoutes } from '@routes/UserRoutes';

function App() {
  const { token } = useTokenContext();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    !token && navigate('/login');
  }, [navigate, token])

  return (
    user?.role === 'ADMIN' ? (
      <AdminRoutes />
    ) : (
      <UserRoutes />
    )
  );
}

export default App;
