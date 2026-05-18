const RecentPosts = () => {
  const posts = [
    { id: 1, title: "React Optimization Tips", status: "Published" },
    { id: 2, title: "JWT Authentication Guide", status: "Draft" },
    { id: 3, title: "Modern UI Patterns", status: "Published" },
  ];

  return (
    <div className="bg-white border rounded-3 shadow-sm p-3">
      <h5 className="fw-semibold mb-3">Recent Posts</h5>

      <ul className="list-group list-group-flush">
        {posts.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between px-0"
          >
            <span>{p.title}</span>

            <span
              className={`badge ${
                p.status === "Published"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
            >
              {p.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;