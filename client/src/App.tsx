import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import WriteBlog from './pages/WriteBlog';
import Profile from './pages/Profile';
import NotificationsPage from './pages/Notifications';
import UserProfile from './pages/UserProfile';
import MyBlogs from './pages/MyBlogs';
import SavedBlogs from './pages/SavedBlogs';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Help from './pages/Help';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const path = useLocation().pathname;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {path !== '/login' && path !== '/signup' && <NavBar />}
      <div className="flex-grow-1">
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<BlogList />} />

        {/* Protected Routes */}
        <Route
        path="/terms"
        element={
          <ProtectedRoute>
          <Terms />
          </ProtectedRoute>
        }
        />
        <Route
        path="/privacy"
        element={
          <ProtectedRoute>
          <Privacy />
          </ProtectedRoute>
        }
        />
        <Route
        path="/support"
        element={
          <ProtectedRoute>
          <Support />
          </ProtectedRoute>
        }
        />
        <Route
        path="/help"
        element={
          <ProtectedRoute>
          <Help />
          </ProtectedRoute>
        }
        />
        <Route
        path="/blog/:id"
        element={
          <ProtectedRoute>
          <BlogDetail />
          </ProtectedRoute>
        }
        />
        <Route
        path="/write"
        element={
          <ProtectedRoute>
          <WriteBlog />
          </ProtectedRoute>
        }
        />

        <Route
        path="/categories"
        element={
          <ProtectedRoute>
          <Categories />
          </ProtectedRoute>
        }
        />

        <Route
        path="/categories/:category"
        element={
          <ProtectedRoute>
          <CategoryDetail />
          </ProtectedRoute>
        }
        />
        <Route
        path="/profile"
        element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        }
        />

        <Route
        path="/my-blogs"
        element={
          <ProtectedRoute>
          <MyBlogs />
          </ProtectedRoute>
        }
        />

        <Route
        path="/saved-blogs"
        element={
          <ProtectedRoute>
          <SavedBlogs />
          </ProtectedRoute>
        }
        />

        <Route
        path="/user/:id"
        element={
          <ProtectedRoute>
          <UserProfile />
          </ProtectedRoute>
        }
        />

        <Route
        path="/notifications"
        element={
          <ProtectedRoute>
          <NotificationsPage />
          </ProtectedRoute>
        }
        />

        {/* Admin Route */}
        <Route
        path="/admin"
        element={
          <ProtectedRoute>
          <AdminPanel />
          </ProtectedRoute>
        }
        />

        {/* Redirect root to appropriate page */}
        <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/blogs" replace /> : <Navigate to="/login" replace />}
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      {path !== '/login' && path !== '/signup' && <Footer />}
    </div>
  );
};

import Footer from './components/Footer';
import Notifications from './components/Notifications';
import { NotificationProvider } from './context/NotificationContext';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
            <Notifications />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
