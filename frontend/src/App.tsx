import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Toaster } from 'sonner';
import { LoginProvider } from './context/LoginContext';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <LoginProvider>
              <Homepage />
            </LoginProvider>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      <Toaster richColors position='bottom-center' />
    </>
  );
}

export default App;
