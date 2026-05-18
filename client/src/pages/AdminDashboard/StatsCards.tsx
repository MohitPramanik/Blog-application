const StatsCards = () => {
  const stats = [
    { label: "Total Posts", value: 128 },
    { label: "Users", value: 54 },
    { label: "Comments", value: 312 },
    { label: "Categories", value: 6 },
  ];

  return (
    <div className="row g-3">
      {stats.map((s, i) => (
        <div key={i} className="col-md-3 col-6">
          <div className="p-3 bg-white border rounded-3 shadow-sm">
            <h6 className="text-muted mb-1">{s.label}</h6>
            <h4 className="fw-semibold mb-0">{s.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;