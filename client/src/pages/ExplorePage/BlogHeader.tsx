import { Button, Col, Container, Form, Row } from 'react-bootstrap'

export default function BlogHeader() {
    return (
        <div className="bg-dark text-light py-5 rounded-4 shadow">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">
                            Discover Stories That Matter
                        </h1>

                        <p className="lead text-light opacity-75 mb-4">
                            Explore blogs, tutorials, developer insights, and creative ideas
                            from people who spend too much time staring at screens. A truly
                            thriving species.
                        </p>

                        <Form>
                            <div className="d-flex bg-white rounded-pill p-2 shadow-sm">
                                <Form.Control
                                    type="text"
                                    placeholder="Search blogs, topics, or authors..."
                                    className="border-0 shadow-none rounded-pill px-4"
                                />

                                <Button
                                    variant="dark"
                                    className="rounded-pill px-4 d-flex align-items-center gap-2"
                                >
                                    {/* <Search size={18} /> */}
                                    Search
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
