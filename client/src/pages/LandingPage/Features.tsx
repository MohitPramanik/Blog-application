export default function Features() {
    return (
        <section id="features" className="py-5 bg-light">
            <div className="container">

                {/* Heading */}
                <div className="text-center mb-5">
                    <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold">
                        FEATURES
                    </span>

                    <h2 className="display-5 fw-bold mt-3">
                        Everything You Need To Blog Better
                    </h2>

                    <p
                        className="text-muted mx-auto fs-5"
                        style={{ maxWidth: "700px" }}
                    >
                        Powerful tools designed for creators who care about
                        performance, readability, and user experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="row g-4">

                    {/* Card 1 */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100 rounded-4 text-center p-4">

                            <div
                                className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                            >
                                ✍️
                            </div>

                            <h4 className="fw-bold mb-3">
                                Create Effortlessly
                            </h4>

                            <p className="text-muted mb-0">
                                Write and manage blogs with a smooth and intuitive editor.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100 rounded-4 text-center p-4">

                            <div
                                className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                            >
                                ⚡
                            </div>

                            <h4 className="fw-bold mb-3">
                                Fast Performance
                            </h4>

                            <p className="text-muted mb-0">
                                Built using React.js and Bootstrap for a lightning-fast experience.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100 rounded-4 text-center p-4">

                            <div
                                className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                            >
                                🌍
                            </div>

                            <h4 className="fw-bold mb-3">
                                Global Reach
                            </h4>

                            <p className="text-muted mb-0">
                                Share your ideas with readers from anywhere in the world.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}