import { BrowserRouter } from 'react-router-dom';

import { RootRoutes } from '@routes/RootRoutes';
import { TokenProvider } from '@context/TokenContext';

export const Root = () => {
  return (
    <BrowserRouter>
      <TokenProvider>
        <RootRoutes />
      </TokenProvider>
    </BrowserRouter>
  );
}