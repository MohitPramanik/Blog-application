export default function CTASection() {
    return (
        <section className="py-5 bg-primary">
            <div className="container">
                <div className="text-center text-white py-5">
                    <h2 className="display-5 fw-bold mb-4">
                        Start Writing Today
                    </h2>

                    <p className="fs-5 mb-4">
                        Join BlogHub and share your knowledge with thousands of readers.
                    </p>

                    <a
                        href="/signup"
                        className="btn btn-light btn-lg rounded-pill px-5"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </section>
    )
}
