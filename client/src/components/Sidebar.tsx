import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-sidebar p-3">
      <h5 className="fw-semibold mb-4">Admin Panel</h5>

      <div className="d-flex flex-column gap-2">
        <button className="btn btn-light text-start" onClick={() => navigate("/admin")}>
          Dashboard
        </button>

        <button className="btn btn-light text-start" onClick={() => navigate("/admin/posts")}>
          Posts
        </button>

        <button className="btn btn-light text-start" onClick={() => navigate("/admin/users")}>
          Users
        </button>

        <button className="btn btn-light text-start" onClick={() => navigate("/admin/categories")}>
          Categories
        </button>
      </div>
    </div>
  );
};

export default Sidebar;