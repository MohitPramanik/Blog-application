import { Col, Container, Row } from "react-bootstrap";
import type { Blog } from "../types/Blog";
import { useState } from "react";
import BlogCard from "../components/BlogCard";

export default function SavedBlogs() {

    const [blogs, setBlogs] = useState<Blog[]>([]);

    return (
        <div className="min-vh-100">
            <Container className="py-5">
                <div className="mb-4">
                    <h1 className="fw-bold display-6 mb-2 text-primary">
                        🔖 Saved Blogs
                    </h1>

                    <p className="text-muted mb-0 px-5">
                        Blogs you've saved to read later
                    </p>
                </div>

                {blogs.length ? (
                    <Row className="g-4">
                        {blogs.map((blog) => (
                            <Col key={blog._id} xs={12} md={6} lg={4}>
                                <BlogCard blog={blog} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5">
                        <h3 className="text-muted">No saved blogs</h3>
                        <p className="text-muted">Save interesting articles from the feed to read later</p>
                    </div>
                )}


            </Container>
        </div>
    )
}


