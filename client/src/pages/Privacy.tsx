import React from 'react';
import '../styles/Legal.css';

const Privacy: React.FC = () => {
  return (
    <main className="legal-page container py-5">
      <h1>Privacy Policy</h1>
      <p className="lead">This Privacy Policy explains how we collect, use, and protect your information.</p>

      <section>
        <h2>Information We Collect</h2>
        <p>We may collect information you provide when registering, posting, or contacting support. We also collect usage data to improve the service.</p>
      </section>

      <section>
        <h2>How We Use Information</h2>
        <p>Data is used to provide and improve services, communicate with users, and comply with legal obligations.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>We use cookies and similar technologies for session management and analytics. You can control cookies through your browser settings.</p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>We take reasonable measures to protect user data, but no system is completely secure.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>For privacy questions, reach out to the site administrator.</p>
      </section>
    </main>
  );
};

export default Privacy;
