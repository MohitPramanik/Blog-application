import Accordion from "react-bootstrap/Accordion";

const faqData = [
  {
    eventKey: "0",
    question: "How do I create a blog post?",
    answer:
      "Go to the dashboard, click on 'Create Post', add your content, select a category, and publish it when ready.",
  },
  {
    eventKey: "1",
    question: "Can I edit or delete my posts?",
    answer:
      "Yes. You can edit or delete your posts anytime from your profile or dashboard under the 'My Posts' section.",
  },
  {
    eventKey: "2",
    question: "Is my data secure?",
    answer:
      "We implement standard security practices to protect user data. However, no system on the internet can guarantee 100% security.",
  },
  {
    eventKey: "3",
    question: "Can I change my profile information?",
    answer:
      "Yes. You can update your profile details like name, bio, email, and profile picture from the profile settings page.",
  },
  {
    eventKey: "4",
    question: "How do categories work?",
    answer:
      "Posts are grouped into categories to help users discover related content easily. You can filter posts by selecting a category.",
  },
  {
    eventKey: "5",
    question: "Do I need an account to read blogs?",
    answer:
      "No, you can read blogs without an account. However, creating an account allows you to interact, comment, and publish posts.",
  },
];

const FAQ = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      {/* Header */}
      <div className="mb-5 p-4 rounded-4 bg-light border">
        <h1 className="fw-semibold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted mb-0">
          Common questions about using the blog platform
        </p>
      </div>

      {/* Accordion */}
      <Accordion
        defaultActiveKey="0"
        className="shadow-sm rounded-4"
      >
        {faqData.map((item) => (
          <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body className="text-muted">
              {item.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Footer */}
      <div className="mt-4 text-center text-muted small">
        Still need help? Contact support.
      </div>
    </div>
  );
};

export default FAQ;