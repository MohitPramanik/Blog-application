import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <Container
            fluid
            className="min-vh-100 d-flex align-items-center justify-content-center bg-white px-3"
        >
            <div className="text-center">

                <h1
                    className="fw-bold text-dark"
                    style={{
                        fontSize: 'clamp(5rem, 15vw, 10rem)',
                        lineHeight: 1
                    }}
                >
                    404
                </h1>

                <h2 className="fw-semibold mt-3 mb-3">
                    Page Not Found
                </h2>

                <p
                    className="text-muted mx-auto mb-4"
                    style={{ maxWidth: '500px' }}
                >
                    The page you are looking for does not exist,
                    was moved, or perhaps was sacrificed to the
                    eternal chaos of frontend routing.
                </p>

                <div className="d-flex justify-content-center gap-3 flex-wrap">

                    <Link to="/">
                        <Button
                            variant="dark"
                            className="px-4 rounded-pill"
                        >
                            Go Home
                        </Button>
                    </Link>


                    <Button
                        variant="outline-dark"
                        className="px-4 rounded-pill"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>

                </div>

            </div>
        </Container>
    );
}