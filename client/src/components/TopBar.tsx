const Topbar = () => {
  return (
    <div className="admin-topbar d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
      <h6 className="mb-0">Admin Dashboard</h6>

      <div className="text-muted small">
        Logged in as Admin
      </div>
    </div>
  );
};

export default Topbar;