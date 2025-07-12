
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import FarmerRegistration from './pages/FarmerRegistration';
import DealerRegistration from './pages/DealerRegistration';
import FarmerDashboard from './pages/FarmerDashboard';
import DealerDashboard from './pages/DealerDashboard';
import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/common/ProtectedRoute';
import Footer from './components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register/farmer" element={<FarmerRegistration />} />
              <Route path="/register/dealer" element={<DealerRegistration />} />
              <Route 
                path="/farmer/dashboard" 
                element={<FarmerDashboard />}
                // element={
                //   <ProtectedRoute role="farmer">
                //     <FarmerDashboard />
                //   </ProtectedRoute>
                // } 
              />
              <Route 
                path="/dealer/dashboard" 
                element={<DealerDashboard />}
                // element={
                //   <ProtectedRoute role="dealer">
                //     <DealerDashboard />
                //   </ProtectedRoute>
                // } 
              />
              <Route 
                path="/admin/dashboard" 
                element={<AdminDashboard />}
                // element={
                //   <ProtectedRoute role="admin">
                //     <AdminDashboard />
                //   </ProtectedRoute>
                // } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
