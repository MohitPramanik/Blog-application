import { useState, type ChangeEvent, type FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSupport = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Support Request:", formData);
    alert("Your message has been submitted. Support will respond soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container py-5" style={{ maxWidth: "950px" }}>
      {/* Header */}
      <div className="mb-5 p-4 rounded-4 bg-light border">
        <h1 className="fw-semibold mb-2">Contact Support</h1>
        <p className="text-muted mb-0">
          Get help, report issues, or send feedback about the platform
        </p>
      </div>

      <div className="row g-4">
        {/* Contact Form */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3">Send a Message</h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-dark w-100 rounded-3">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="col-md-5">
          <div className="d-flex flex-column gap-3">

            <div className="p-4 border rounded-4 bg-white shadow-sm">
              <h6 className="fw-semibold mb-2">Email Support</h6>
              <p className="text-muted mb-0">
                support@yourblog.com
              </p>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm">
              <h6 className="fw-semibold mb-2">Response Time</h6>
              <p className="text-muted mb-0">
                Usually within 24–48 hours
              </p>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm">
              <h6 className="fw-semibold mb-2">Common Issues</h6>
              <ul className="text-muted mb-0 ps-3">
                <li>Login problems</li>
                <li>Post publishing errors</li>
                <li>Profile update issues</li>
                <li>Category navigation bugs</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;