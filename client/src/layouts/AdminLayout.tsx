import type React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import "./admin.css";

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="admin-container d-flex">
      <Sidebar />

      <div className="flex-grow-1 admin-main">
        <Topbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;