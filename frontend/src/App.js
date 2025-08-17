import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

// Placeholder Components
const Home = () => <div><h1>Welcome to the Freelancer Platform</h1><Link to="/login">Login</Link> | <Link to="/register">Register</Link></div>;
//const Register = () => <div><h2>Register</h2></div>;
//const Login = () => <div><h2>Login</h2></div>;
const ClientDashboard = () => <div><h2>Client Dashboard</h2><p>Post and manage your projects here.</p></div>;
const FreelancerDashboard = () => <div><h2>Freelancer Dashboard</h2><p>Find and bid on projects here.</p></div>;
const NotFound = () => <div><h2>404 - Page Not Found</h2></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protect client dashboard */}
          <Route 
            path="/client-dashboard" 
            element={
              <PrivateRoute allowedRoles={['client']}>
                <ClientDashboard />
              </PrivateRoute>
            } 
          />
          {/* Protect freelancer dashboard */}
          <Route 
            path="/freelancer-dashboard" 
            element={
              <PrivateRoute allowedRoles={['freelancer']}>
                <FreelancerDashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
