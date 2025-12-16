import React, { memo } from 'react';
import '../styles/Legal.css';

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing or using this Blogging App, you confirm that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these Terms, you must discontinue use of the platform immediately.',
  },
  {
    title: 'Eligibility',
    content:
      'You must be at least 13 years old to use this platform. By using the service, you represent and warrant that you meet the eligibility requirements and have the legal capacity to enter into these Terms.',
  },
  {
    title: 'User Accounts',
    content:
      'To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.',
  },
  {
    title: 'Content Ownership',
    content:
      'You retain ownership of the content you publish on the platform. However, by posting content, you grant us a non-exclusive, royalty-free license to display, distribute, and promote your content as part of the service.',
  },
  {
    title: 'Prohibited Activities',
    content:
      'You agree not to upload or share content that is unlawful, harmful, defamatory, obscene, misleading, or that violates intellectual property rights. Abuse of the platform may result in suspension or termination of your account.',
  },
  {
    title: 'Moderation and Removal',
    content:
      'We reserve the right to review, moderate, or remove any content that violates these Terms or is deemed inappropriate, without prior notice.',
  },
  {
    title: 'Termination',
    content:
      'We may suspend or terminate your access to the platform at any time if you violate these Terms or misuse the service. Upon termination, your right to use the service will cease immediately.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'The platform is provided on an “as is” basis. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the service.',
  },
  {
    title: 'Changes to Terms',
    content:
      'We may update these Terms from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised Terms.',
  },
];

const Terms: React.FC = () => {
  return (
    <main className="legal-page container py-5" aria-labelledby="terms-title">
      <header className="legal-header mb-5">
        <h1 id="terms-title" className="legal-title">Terms of Service</h1>
        <p className="legal-subtitle">
          Please read these Terms of Service carefully before using the Blogging App.
        </p>
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
          <h2 className="legal-section-title">Contact Information</h2>
          <p className="legal-text">
            If you have any questions or concerns regarding these Terms of Service, please contact the site administrator through the official support channels.
          </p>
        </section>
      </article>
    </main>
  );
};

export default memo(Terms);
