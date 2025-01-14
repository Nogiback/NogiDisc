import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './components/ui/themeProvider';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={googleClientID}>
            <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
              <App />
            </ThemeProvider>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
