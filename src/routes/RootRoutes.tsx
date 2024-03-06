import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { Login } from '../pages/login/Login';

export const RootRoutes = () =>
  <Routes>
    <Route path='/*' element={<App />} />
    <Route path='/login' element={<Login />} />
  </Routes>