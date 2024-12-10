import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';

function App() {
  //! used for testing, REMOVE later
  const isUserLoggedIn = false;

  return (
    <Routes>
      <Route
        path='/'
        element={isUserLoggedIn ? <Navigate to='/dashboard' /> : <Homepage />}
      />
      <Route
        path='/dashboard'
        element={isUserLoggedIn ? <Dashboard /> : <Navigate to='/' />}
      />
    </Routes>
  );
}

export default App;
