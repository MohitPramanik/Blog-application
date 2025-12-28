import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import BlogContextProvider from './context/BlogContext';

import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

import ProtectedRoute from './utils/ProtectedRoute';


const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));

const BlogList = React.lazy(() => import("./pages/BlogList"));
const WriteBlog = React.lazy(() => import('./pages/WriteBlog'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotificationsPage = React.lazy(() => import('./pages/Notifications'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const MyBlogs = React.lazy(() => import('./pages/MyBlogs'));
const SavedBlogs = React.lazy(() => import('./pages/SavedBlogs'));
const Categories = React.lazy(() => import('./pages/Categories'));
const CategoryDetail = React.lazy(() => import('./pages/CategoryDetail'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Support = React.lazy(() => import('./pages/Support'));
const Help = React.lazy(() => import('./pages/Help'));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));
const Notifications = React.lazy(() => import('./components/Notifications'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const BlogWrapper = React.lazy(() => import('./pages/BlogWrapper'));

import { ToastContainer } from 'react-toastify';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './utils/ErrorBoundary';

const AppContent: React.FC = () => {
  const { isAuthchecked, loading } = useAuth();
  const path = useLocation().pathname;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [path])

  if (loading || !isAuthchecked) {
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
      <ToastContainer limit={1} autoClose={3000} pauseOnHover />
      <div className="flex-grow-1">
        <ErrorBoundary fallback={<ErrorFallback />} onReset={() => {}}>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route path="/blogs"
                index
                element={
                  <ProtectedRoute>
                    <BlogList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <ProtectedRoute>
                    <BlogWrapper />
                  </ProtectedRoute>
                }
              />
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

              {/* 404 Fallback */}
              <Route path="/" element={<Navigate to="/blogs" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
      {path !== '/login' && path !== '/signup' && <Footer />}
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <BlogContextProvider>
              <AppContent />
            </BlogContextProvider>
            <Notifications />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
