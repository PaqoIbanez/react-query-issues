import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { router } from './router';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   // <React.StrictMode>
      <QueryClientProvider client={client}>
         <ReactQueryDevtools initialIsOpen={true} />
         <RouterProvider router={router} />
      </QueryClientProvider>
   // {/* </React.StrictMode> */}
)
