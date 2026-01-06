import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext';

import Loader from './components/Loader';
import NavBar from './components/Navbar';

import ProtectedRoute from './utils/ProtectedRoute';


const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

// const NotificationProvider = lazy(() => import('./context/NotificationContext'));
const Footer = lazy(() => import('./components/Footer'));
const BlogContextProvider = lazy(() => import('./context/BlogContext'));
const BlogList = lazy(() => import("./pages/BlogList"));
const WriteBlog = lazy(() => import('./pages/WriteBlog'));
const Profile = lazy(() => import('./pages/Profile'));
const NotificationsPage = lazy(() => import('./pages/Notifications'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const MyBlogs = lazy(() => import('./pages/MyBlogs'));
const SavedBlogs = lazy(() => import('./pages/SavedBlogs'));
const Categories = lazy(() => import('./pages/Categories'));
const CategoryDetail = lazy(() => import('./pages/CategoryDetail'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Support = lazy(() => import('./pages/Support'));
const Help = lazy(() => import('./pages/Help'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
// const Notifications = lazy(() => import('./components/Notifications'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BlogWrapper = lazy(() => import('./pages/BlogWrapper'));

const ToastContainer = lazy(() => import('react-toastify').then(m => ({ default: m.ToastContainer })));
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
        <ErrorBoundary fallback={<ErrorFallback />} onReset={() => { }}>
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
          {/* <NotificationProvider> */}
          <BlogContextProvider>
            <AppContent />
          </BlogContextProvider>
          {/* </NotificationProvider> */}
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
