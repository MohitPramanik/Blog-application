import ActivityFeed from "./ActivityFeed";
import QuickActions from "./QuickActions";
import RecentPosts from "./RecentPosts";
import StatsCards from "./StatsCards";

const AdminDashboard = () => {
  return (
    <div className="container py-4" style={{ maxWidth: "1100px" }}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-semibold mb-1">Dashboard</h2>
        <p className="text-muted mb-0">
          Overview of your blog activity and content
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      <div className="row mt-4 g-4">
        <div className="col-lg-8">
          <RecentPosts />
          <div className="mt-4">
            <ActivityFeed />
          </div>
        </div>

        <div className="col-lg-4">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;