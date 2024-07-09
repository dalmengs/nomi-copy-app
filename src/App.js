import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import LoadingPage from './pages/LoadingPage';
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/password" element={<ForgotPasswordPage />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
