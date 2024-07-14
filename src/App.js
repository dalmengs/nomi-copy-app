import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import LoadingPage from './pages/LoadingPage';
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import HelpPage from './pages/HelpPage';
import NomiTypePage from './pages/NomiTypePage';
import NomiCreatePage from './pages/NomiCreatePage';
import ChatListPage from './pages/ChatListPage';
import ChatPage from './pages/ChatPage';

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
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/account" element={<AccountSettingsPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/account/delete" element={<DeleteAccountPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/profile" element={<UpdateProfilePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/help" element={<HelpPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/new" element={<NomiTypePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/new/create" element={<NomiCreatePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/chat" element={<ChatListPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/chat/:daly_id" element={<ChatPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
