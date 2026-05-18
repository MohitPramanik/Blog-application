import React from 'react'

export default function Stats() {
    return (
        <section id="stats" className="py-5 bg-light">
            <div className="container">
                <div className="row g-4 text-center">
                    <div className="col-md-4">
                        <div className="bg-white shadow-sm rounded-4 p-5 h-100">
                            <h2 className="fw-bold text-primary display-5">10K+</h2>

                            <p className="text-secondary mb-0">Active Readers</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-white shadow-sm rounded-4 p-5 h-100">
                            <h2 className="fw-bold text-primary display-5">5K+</h2>

                            <p className="text-secondary mb-0">Published Blogs</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-white shadow-sm rounded-4 p-5 h-100">
                            <h2 className="fw-bold text-primary display-5">99%</h2>

                            <p className="text-secondary mb-0">User Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
