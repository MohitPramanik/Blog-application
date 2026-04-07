import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext';

import Loader from './components/Loader';
import InitialPageLoader from './components/InitialPageLoader';
import ProtectedRoute from './utils/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

// const NotificationProvider = lazy(() => import('./context/NotificationContext'));
const NavBar = lazy(() => import('./components/Navbar'));
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
import { HelmetProvider } from 'react-helmet-async';

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
    return <InitialPageLoader />;
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
              <Route element={<ProtectedRoute roles={['User', 'Admin']} />}>
                <Route path="/blogs" index element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogWrapper />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/support" element={<Support />} />
                <Route path="/help" element={<Help />} />
                <Route path="/write" element={<WriteBlog />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:category" element={<CategoryDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-blogs" element={<MyBlogs />} />
                <Route path="/saved-blogs" element={<SavedBlogs />} />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/notifications" element={<NotificationsPage />} />
              </Route>

              <Route element={<ProtectedRoute roles={["Admin"]} />} >
                <Route path="/admin" element={<AdminPanel />} />
              </Route>

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
    <HelmetProvider>
      <main>
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
      </main>
    </HelmetProvider>
  );
};

export default App;
