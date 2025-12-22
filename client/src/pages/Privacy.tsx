import React, { memo } from 'react';
import '../styles/Legal.css';

const sections = [
	{
		title: 'Information We Collect',
		content:
			'We collect information you provide directly (such as when you create an account, post a blog, or communicate with support) and information collected automatically (such as usage data, device information, and cookies).',
	},
	{
		title: 'How We Use Information',
		content:
			'We use the information to provide, maintain, and improve the service, to communicate with you, to personalize content, and to detect and prevent abuse or fraud.',
	},
	{
		title: 'Cookies & Tracking',
		content:
			'We use cookies and similar technologies to store preferences, enable site features, and collect analytics. You can control cookie preferences through your browser settings.',
	},
	{
		title: 'Third-Party Services',
		content:
			'We may share information with service providers who help operate the platform (hosting, analytics, email delivery). Third parties may have their own privacy policies; we encourage you to review them.',
	},
	{
		title: 'Data Retention',
		content:
			'We retain your account and content information for as long as your account is active or as needed to provide the service. You can request deletion of your account and data by contacting us.',
	},
	{
		title: 'Security',
		content:
			'We implement reasonable security measures to protect your information, but no method of transmission or storage is 100% secure. If a data incident occurs, we will follow applicable laws and notify affected users where required.',
	},
	{
		title: 'Your Rights & Choices',
		content:
			'Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data, and to object to or restrict certain processing. Contact us to exercise these rights.',
	},
	{
		title: "Children's Privacy",
		content:
			'The platform is not intended for children under 13. We do not knowingly collect personal information from children under 13; if you believe your child provided information, contact us to request deletion.',
	},
	{
		title: 'Changes to This Policy',
		content:
			'We may update this Privacy Policy from time to time. When changes are material, we will provide notice through the app or email as required by law.',
	},
];

const Privacy: React.FC = () => {
	return (
		<main className="legal-page container py-5" aria-labelledby="privacy-title">
			<header className="legal-header mb-5">
				<h1 id="privacy-title" className="legal-title">Privacy Policy</h1>
				<p className="legal-subtitle">We respect your privacy. This policy explains what we collect, why, and your choices.</p>
			</header>

			<article className="legal-card">
				<div className="privacy-summary mb-4">
					<p>
						<strong>Summary:</strong> We collect only the information needed to run the service, we do not sell your personal data, and you can request access or deletion of your information.
					</p>
				</div>

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
						If you have questions about this Privacy Policy or wish to exercise your rights, please email <strong>privacy@example.com</strong>.
					</p>
				</section>
			</article>
		</main>
	);
};

export default memo(Privacy);

