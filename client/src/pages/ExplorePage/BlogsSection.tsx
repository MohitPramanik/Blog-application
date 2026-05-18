import BlogCard from "../../components/BlogCard";
import type { Blog } from "../../types/Blog";
import { Col, Container, Row } from "react-bootstrap";

interface BlogSectionProps {
    blogs: Blog[]
}

export default function BlogsSection({ blogs }: BlogSectionProps) {
    return (
        <Container fluid="lg" className="py-5">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Latest Blogs</h2>
                    <p className="text-muted mb-0">
                        Discover trending articles, tutorials, and developer thoughts from the
                        community. Humanity documenting everything instead of resting for once.
                    </p>
                </div>
                <div className="mt-3 mt-md-0">
                    <span className="badge bg-dark fs-6 px-3 py-2">
                        {blogs.length} Articles
                    </span>
                </div>
            </div>
            
            <Row className="g-4">
                {blogs.map((blog: Blog) => (
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} key={blog._id}>
                        <BlogCard blog={blog} />
                    </Col>
                ))}
            </Row>

            {blogs.length === 0 && (
                <div className="text-center py-5">
                    <h4 className="fw-semibold">No Blogs Found</h4>

                    <p className="text-muted">
                        Try searching with different keywords. The database is not emotionally
                        prepared to return results right now.
                    </p>
                </div>
            )}
        </Container>
    )
}
