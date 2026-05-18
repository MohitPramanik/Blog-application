const ActivityFeed = () => {
  const activity = [
    "New user registered",
    "Post published: React Tips",
    "Comment added on JWT Guide",
    "Category updated: Tech",
  ];

  return (
    <div className="bg-white border rounded-3 shadow-sm p-3">
      <h5 className="fw-semibold mb-3">Activity</h5>

      <ul className="list-unstyled mb-0">
        {activity.map((a, i) => (
          <li key={i} className="text-muted small py-1">
            • {a}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;