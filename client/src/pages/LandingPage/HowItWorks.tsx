export default function HowItWorks() {
    const steps = [
        {
            icon: "📝",
            title: "Create Your Account",
            desc: "Join the platform in seconds and personalize your profile to start your blogging journey."
        },
        {
            icon: "✨",
            title: "Write & Publish",
            desc: "Use our distraction-free editor to create engaging blogs with a seamless writing experience."
        },
        {
            icon: "🚀",
            title: "Reach Your Audience",
            desc: "Share your content worldwide, connect with readers, and grow your online presence."
        }
    ];

    return (
        <section className="py-5 bg-white">
            <div className="container py-5">

                {/* Heading */}
                <div className="text-center mb-5">

                    <span className="badge bg-dark-subtle text-dark px-3 py-2 rounded-pill fw-semibold">
                        HOW IT WORKS
                    </span>

                    <h2 className="display-5 fw-bold mt-3">
                        Start Blogging In Three Simple Steps
                    </h2>

                    <p
                        className="text-muted fs-5 mx-auto"
                        style={{ maxWidth: "700px" }}
                    >
                        Everything is designed to help creators focus on writing,
                        publishing, and growing their audience effortlessly.
                    </p>
                </div>

                {/* Steps */}
                <div className="row g-4">

                    {steps.map((step, i) => (
                        <div key={i} className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                                {/* Step Number */}
                                <div className="mb-3">
                                    <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">
                                        Step {i + 1}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div
                                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-light"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "2.5rem"
                                    }}
                                >
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h4 className="fw-bold mb-3">
                                    {step.title}
                                </h4>

                                <p className="text-muted mb-0">
                                    {step.desc}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}