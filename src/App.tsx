// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register'; // Import the new Register page
import Dashboard from './pages/Dashboard';
import { Transfer } from './components/WalletOperations';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Register />} /> {/* Register page as the default route */}
          <Route path="/login" element={<Login />} /> {/* Login page at /login */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/transfer" element={<Transfer />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;