export default function HeroSection() {
    return (
        <section className="bg-white">
            <div className="container">
                <div className="row align-items-center min-vh-100 py-5">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
                            Modern Blogging Platform
                        </span>

                        <h1 className="display-3 fw-bold mb-4">
                            Share Your Stories With The World
                        </h1>

                        <p className="lead text-secondary mb-4">
                            BlogHub helps creators, developers, and writers publish beautiful
                            blogs with a smooth reading experience. Another platform for human
                            thoughts. At least this one uses React properly.
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <a
                                href="/signup"
                                className="btn btn-primary btn-lg rounded-pill px-4"
                            >
                                Get Started
                            </a>

                            <a
                                href="#features"
                                className="btn btn-outline-dark btn-lg rounded-pill px-4"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 text-center">
                        <img
                            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                            alt="Blogging"
                            className="img-fluid rounded-4 shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
