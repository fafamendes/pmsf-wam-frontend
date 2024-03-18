import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RootRoutes } from '@routes/RootRoutes';
import { TokenProvider } from '@context/TokenContext';
import { UserProvider } from '@context/UserContext';
import { Toaster } from 'sonner';

export const Root = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TokenProvider>
          <UserProvider>
            <RootRoutes />
          </UserProvider>
        </TokenProvider>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}