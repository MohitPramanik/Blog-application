import React, { memo } from 'react';
import '../styles/Legal.css';

const sections = [
  {
    title: 'Support Channels',
    content:
      'We offer support via email and an in-app contact form. For urgent issues, include as much detail as possible so we can investigate quickly.',
  },
  {
    title: 'Report a Bug',
    content:
      'If you encounter a bug, please provide steps to reproduce, the browser and device you are using, and any relevant screenshots or error messages.',
  },
  {
    title: 'Account Help',
    content:
      'For account-related inquiries (login issues, account settings), please include your account email and a brief description of the problem.',
  },
  {
    title: 'Response Time',
    content:
      'We aim to respond to support requests within 48 hours. Response times may vary during weekends or holidays.',
  },
];

const Support: React.FC = () => {
  return (
    <main className="legal-page container py-5" aria-labelledby="support-title">
      <header className="legal-header mb-5">
        <h1 id="support-title" className="legal-title">Support Center</h1>
        <p className="legal-subtitle">Need help? We're here to assist you.</p>
      </header>

      <article className="legal-card">
        {sections.map((section, index) => (
          <section key={section.title} className="legal-section">
            <span className="legal-index">{index + 1}</span>
            <div>
              <h2 className="legal-section-title">{section.title}</h2>
              <p className="legal-text">{section.content}</p>
            </div>
          </section>
        ))}

        <section className="legal-section legal-contact">
          <h2 className="legal-section-title">Contact Support</h2>
          <p className="legal-text">
            To contact support, email <strong>support@example.com</strong> or use the in-app support form.
          </p>
        </section>
      </article>
    </main>
  );
};

export default memo(Support);
