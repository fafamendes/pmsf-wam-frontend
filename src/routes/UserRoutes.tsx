import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/home/Home';


export const UserRoutes = () =>
  <Routes>
    <Route path='/' element={<Home />} />
  </Routes>