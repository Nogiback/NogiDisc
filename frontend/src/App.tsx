import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Toaster } from 'sonner';
import { LoginProvider } from './context/LoginContext';

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
      </Routes>
      <Toaster richColors position='bottom-center' />
    </>
  );
}

export default App;
