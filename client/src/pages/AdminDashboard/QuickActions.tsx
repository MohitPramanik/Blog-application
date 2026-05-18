const QuickActions = () => {
  const actions = [
    "Create Post",
    "Manage Users",
    "Add Category",
    "View Reports",
  ];

  return (
    <div className="bg-white border rounded-3 shadow-sm p-3">
      <h5 className="fw-semibold mb-3">Quick Actions</h5>

      <div className="d-grid gap-2">
        {actions.map((a, i) => (
          <button key={i} className="btn btn-outline-dark btn-sm">
            {a}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;