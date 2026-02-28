import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import LandingPage from './components/LandingPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import PlansPage from './components/PlansPage.jsx';
import ResetPassword from './components/ResetPassword.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public marketing site */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/get-started" element={<PlansPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Authenticated platform — all /dashboard/* handled by App internally */}
        <Route path="/dashboard" element={<App />} />
        <Route path="/dashboard/*" element={<App />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
