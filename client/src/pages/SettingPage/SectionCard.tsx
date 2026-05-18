import { Card } from "react-bootstrap";

interface SectionCardProps {
    title: string;
    description: string;
    children: React.ReactNode
}

export default function SectionCard({ title, description, children }: SectionCardProps) {
    return (
        <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body className="p-4">
                <div className="mb-4">
                    <h3 className="fw-bold mb-1">{title}</h3>
                    <p className="text-muted mb-0">{description}</p>
                </div>

                {children}
            </Card.Body>
        </Card>
    );
}