import { useEffect, useState } from 'react';
import './App.css';

import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '@context/index';

import { me } from '@services/me'

function App() {
  const { token, logout } = useTokenContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    !token && navigate('/login');
  }, [navigate, token])

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const { user } = await me(token)
        setUser(user)
      } else {
        setUser(null)
      }
    }

    fetchUser();

  }, [token])

  return (
    <div className="App">
      <button onClick={logout}>Sair</button>
      <div>
        Olá

        {user &&
          <div>
            <h1>Nome: {user.name}</h1>
            <h1>Matrícula: {user.username}</h1>
            <h1>Tipo de Usuário: {user.role}</h1>
            <h1>Status: {user.status.toString()}</h1>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
