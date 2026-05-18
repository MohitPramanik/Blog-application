import { Outlet } from "react-router";
import Footer from "../components/Footer";
import AppNavbar from "../components/Navbar";

export default function CommonLayout() {
  return (
    <>
        <AppNavbar />
        <Outlet />
        <Footer />
    </>
  )
}
