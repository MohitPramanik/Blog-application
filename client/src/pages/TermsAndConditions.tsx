import Accordion from "react-bootstrap/Accordion";

const termsData = [
  {
    eventKey: "0",
    title: "Acceptance of Terms",
    content:
      "By accessing and using this blog platform, you agree to comply with these Terms and Conditions. If you do not agree, you should not use the platform.",
  },
  {
    eventKey: "1",
    title: "User Accounts",
    content:
      "Users are responsible for maintaining the confidentiality of their account credentials. Any activity under your account is your responsibility.",
  },
  {
    eventKey: "2",
    title: "Content Ownership",
    content:
      "Users retain ownership of the content they publish. However, by posting, you grant the platform a license to display and distribute the content within the service.",
  },
  {
    eventKey: "3",
    title: "Prohibited Activities",
    content:
      "Users must not post illegal, abusive, harmful, or misleading content. Any violation may result in content removal or account suspension.",
  },
  {
    eventKey: "4",
    title: "Platform Usage",
    content:
      "The platform is intended for personal and informational use. You agree not to misuse or attempt to disrupt system functionality.",
  },
  {
    eventKey: "5",
    title: "Limitation of Liability",
    content:
      "The platform is provided 'as is' without warranties. We are not responsible for any damages resulting from use of the service.",
  },
  {
    eventKey: "6",
    title: "Modifications",
    content:
      "We reserve the right to update or modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.",
  },
];

const TermsAndConditions = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      {/* Header */}
      <div className="mb-5 p-4 rounded-4 bg-light border">
        <h1 className="fw-semibold mb-2">Terms & Conditions</h1>
        <p className="text-muted mb-0">
          Rules and guidelines for using the blog platform
        </p>
      </div>

      {/* Accordion */}
      <Accordion
        defaultActiveKey="0"
        className="shadow-sm rounded-4"
      >
        {termsData.map((item) => (
          <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body className="text-muted">
              {item.content}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Footer */}
      <div className="mt-4 text-center text-muted small">
        Last updated: May 2026
      </div>
    </div>
  );
};

export default TermsAndConditions;