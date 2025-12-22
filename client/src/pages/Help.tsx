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
    a: 'Navigate to Write Blog, add your content and images, then click Publish to make it public. Consider adding tags and a short summary to help discovery.',
  },
  {
    q: 'How do I report abuse?',
    a: 'Use the in-app report option on any post or contact support with details and links. Include screenshots when possible.',
  },
  {
    q: 'How do I format my posts?',
    a: 'Use the editor toolbar to add headings, bold, links, and lists. Keep paragraphs short and use images sparingly for better readability.',
  },
  {
    q: 'What image sizes are supported?',
    a: 'Images are resized automatically. For best results, upload images that are 1200px wide or smaller and under 2MB in size.',
  },
  {
    q: 'How do notifications work?',
    a: 'Enable notifications in your profile to receive updates about comments, likes, and new followers. You can control notification types in your settings.',
  },
];

const tips = [
  'Write descriptive titles and use tags to improve discoverability.',
  'Preview your post before publishing to check formatting and images.',
  'Engage with comments to build a following and improve visibility.'
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

        <section className="legal-section">
          <span className="legal-index">T</span>
          <div>
            <h2 className="legal-section-title">Quick Tips</h2>
            <ul className="legal-text">
              {tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="legal-section legal-contact">
          <h2 className="legal-section-title">Still need help?</h2>
          <p className="legal-text">If your question isn't covered here, please contact <strong>support@example.com</strong>.</p>
        </section>
      </article>
    </main>
  );
};

export default memo(Help);
