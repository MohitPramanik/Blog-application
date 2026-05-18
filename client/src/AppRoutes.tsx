import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import BlogDetailsPage from './pages/BlogDetailsPage/BlogDetailPage';
import SettingsPage from './pages/SettingPage/SettingsPage';
import NotFound from './pages/NotFound';
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const CommonLayout = lazy(() => import("./layouts/CommonLayout"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const Create = lazy(() => import("./pages/Create"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));
const SavedBlogs = lazy(() => import("./pages/SavedBlogs"));
const Profile = lazy(() => import("./pages/Profile"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));
const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"));
const GuestRoute = lazy(() => import("./utils/GuestRoute"));
const Blogs = lazy(() => import("./pages/ExplorePage/Blogs"));
const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard/AdminDashboard"));

export default function AppRoutes() {
	return (
		<>
			<Routes>
				<Route element={<GuestRoute />}>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
				</Route>

				<Route element={<CommonLayout />}>

					<Route element={<GuestRoute />}>
						<Route path="/" element={<LandingPage />} />
					</Route>

					<Route path="/policy" element={<PrivacyPolicy />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/terms" element={<TermsAndConditions />} />
					<Route path="/support" element={<ContactSupport />} />

					<Route element={<ProtectedRoute />}>
						<Route path='/blogs'>
							<Route path='' element={<Blogs />} />
							<Route path=':id' element={<BlogDetailsPage />} />
							<Route path="create" element={<Create />} />
							<Route path="my-blogs" element={<MyBlogs />} />
							<Route path="saved" element={<SavedBlogs />} />
							<Route path="categories" element={<CategoriesPage />} />
							<Route path="categories/:slug" element={<div>Category Posts Page</div>} />
						</Route>
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<SettingsPage />} />
					</Route>

					<Route element={<PrivateRoute roles={['Admin']} />}>
						<Route path="/admin" element={<AdminDashboard />} />
					</Route>

				</Route>

				<Route path="/*" element={<NotFound />} />

			</Routes>
		</>
	)
}
