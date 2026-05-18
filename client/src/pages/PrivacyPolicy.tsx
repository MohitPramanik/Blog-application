import Accordion from "react-bootstrap/Accordion";

const policyData = [
  {
    eventKey: "0",
    title: "Information We Collect",
    content:
      "We collect basic information such as name, email address, and profile details during registration. We also collect usage data including page visits, interactions, and session behavior to improve platform performance.",
  },
  {
    eventKey: "1",
    title: "How We Use Information",
    content:
      "We use collected data to operate the platform, personalize user experience, improve performance, and maintain security. This helps us deliver relevant content and better recommendations.",
  },
  {
    eventKey: "2",
    title: "Cookies",
    content:
      "Cookies are used to store session information and user preferences. They help improve usability and maintain login sessions. Users can disable cookies in browser settings, though some features may stop working.",
  },
  {
    eventKey: "3",
    title: "Data Sharing",
    content:
      "We do not sell personal data. Limited sharing may occur with trusted third-party services for hosting, authentication, analytics, or essential platform functionality.",
  },
  {
    eventKey: "4",
    title: "Data Security",
    content:
      "We implement reasonable technical and organizational measures to protect user data. However, no system on the internet can guarantee absolute security.",
  },
  {
    eventKey: "5",
    title: "Your Rights",
    content:
      "Users may request access, correction, or deletion of their personal data. Requests will be handled within a reasonable timeframe according to applicable policies.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      {/* Header */}
      <div className="mb-5 p-4 rounded-4 bg-light border">
        <h1 className="fw-semibold mb-2">Privacy Policy</h1>
        <p className="text-muted mb-0">
          Structured overview of how your data is handled within the platform
        </p>
      </div>

      {/* Accordion */}
      <Accordion defaultActiveKey="0" className="shadow-sm rounded-4">
        {policyData.map((item) => (
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

export default PrivacyPolicy;