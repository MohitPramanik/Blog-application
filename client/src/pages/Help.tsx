import React, { memo } from 'react';
import '../styles/Legal.css';

const faqs = [
  {
    q: 'How do I create an account?',
    a: 'Click Sign Up in the top-right and follow the registration steps. Verify your email to unlock all features.',
  },
  {
    q: 'How can I reset my password?',
    a: 'Use the "Forgot password" link on the login page to request a password reset email.',
  },
  {
    q: 'How do I publish a blog?',
    a: 'Navigate to Write Blog, add your content and images, then click Publish to make it public.',
  },
  {
    q: 'How do I report abuse?',
    a: 'Use the in-app report option on any post or contact support with details and links.',
  },
];

const Help: React.FC = () => {
  return (
    <main className="legal-page container py-5" aria-labelledby="help-title">
      <header className="legal-header mb-5">
        <h1 id="help-title" className="legal-title">Help & FAQs</h1>
        <p className="legal-subtitle">Answers to common questions to help you use the app.</p>
      </header>

      <article className="legal-card">
        {faqs.map((item, index) => (
          <section key={item.q} className="legal-section">
            <span className="legal-index">{index + 1}</span>
            <div>
              <h2 className="legal-section-title">{item.q}</h2>
              <p className="legal-text">{item.a}</p>
            </div>
          </section>
        ))}

        <section className="legal-section legal-contact">
          <h2 className="legal-section-title">Still need help?</h2>
          <p className="legal-text">If your question isn't covered here, please contact <strong>support@example.com</strong>.</p>
        </section>
      </article>
    </main>
  );
};

export default memo(Help);
