import { BrowserRouter } from 'react-router-dom';

import { RootRoutes } from '@routes/RootRoutes';
import { TokenProvider } from '@context/TokenContext';
import { UserProvider } from '@context/UserContext';
import { Toaster } from 'sonner';

export const Root = () => {
  return (
    <BrowserRouter>
      <TokenProvider>
        <UserProvider>
          <RootRoutes />
        </UserProvider>
      </TokenProvider>
      <Toaster />
    </BrowserRouter>
  );
}