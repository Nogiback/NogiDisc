import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
