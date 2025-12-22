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
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-only demo: we would normally POST to an API endpoint
    console.log('Support request:', { email, subject, message });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="legal-page container py-5" aria-labelledby="support-title">
      <header className="legal-header mb-5">
        <h1 id="support-title" className="legal-title">Support Center</h1>
        <p className="legal-subtitle">Need help? We're here to assist you. Review the sections below or send us a message.</p>
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

        <section className="legal-section">
          <span className="legal-index">5</span>
          <div>
            <h2 className="legal-section-title">Quick Templates</h2>
            <p className="legal-text"><strong>Bug report:</strong> "Steps to reproduce: ...; Browser: ...; Expected: ...; Actual: ..."</p>
            <p className="legal-text"><strong>Account help:</strong> "Account email: ...; Issue: ...; Any error messages: ..."</p>
          </div>
        </section>

        <section className="legal-section legal-contact">
          <div style={{flex:1}}>
            <h2 className="legal-section-title">Contact Support</h2>
            <p className="legal-text">Send us a message and we'll respond as soon as possible (typical response time: 48 hours).</p>

            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-2">
                <label className="form-label">Your email</label>
                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Subject</label>
                <input className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Send</button>
                {sent && <span className="text-success align-self-center">Message sent (demo)</span>}
              </div>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
};

export default memo(Support);
