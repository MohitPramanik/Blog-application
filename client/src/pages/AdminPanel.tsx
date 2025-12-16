import '../styles/Legal.css';

const AdminPanel: React.FC = () => {
  return (
    <main className="legal-page container py-5" aria-labelledby="admin-title">
      <header className="legal-header mb-5">
        <h1 id="admin-title" className="legal-title">Admin Panel</h1>
        <p className="legal-subtitle">Administrative tools for managing the Blogging App.</p>
      </header>

      <article className="legal-card">
        <section className="legal-section">
          <div>
            <h2 className="legal-section-title">User Management</h2>
            <p className="legal-text">View and manage user accounts, roles, and permissions (placeholder).</p>
          </div>
        </section>

        <section className="legal-section">
          <div>
            <h2 className="legal-section-title">Content Moderation</h2>
            <p className="legal-text">Review reported posts and moderate content as needed (placeholder).</p>
          </div>
        </section>

        <section className="legal-section legal-contact">
          <h2 className="legal-section-title">Contact</h2>
          <p className="legal-text">For admin assistance, contact the site owner or lead administrator.</p>
        </section>
      </article>
    </main>
  );
};

export default AdminPanel;
