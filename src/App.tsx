import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Layout from './components/Layout';
import Dashboard from './components/pages/Dashboard';
import MemberManagement from './components/pages/MemberManagement';
import BurningHistory from './components/pages/BurningHistory';
import Reports from './components/pages/Reports';
import MaintenanceLog from './components/pages/MaintenanceLog';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<MemberManagement />} />
          <Route path="burning-history" element={<BurningHistory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="maintenance" element={<MaintenanceLog />} />
        </Route>
      </Routes>
    </Router>
  );
}
