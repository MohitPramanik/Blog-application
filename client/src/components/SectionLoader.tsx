import React from 'react';
import { Spinner } from 'react-bootstrap';

interface SectionLoaderProps {
    text?: string;
    height?: string;
}

export default function SectionLoader({
    text = 'Loading...',
    height = '250px',
}: SectionLoaderProps) {

    return (
        <div
            className="h-100 d-flex flex-column justify-content-center align-items-center bg-white rounded-4"
            style={{
                minHeight: height,
                width: '100%',
            }}
        >
            <Spinner
                animation="border"
                variant="dark"
                style={{
                    width: '3rem',
                    height: '3rem',
                    borderWidth: '4px',
                }}
            />

            <p className="text-muted mt-3 mb-0 fw-medium">
                {text}
            </p>
        </div>
    );
}