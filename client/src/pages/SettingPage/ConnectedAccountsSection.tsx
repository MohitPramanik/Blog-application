import { Button, Card } from "react-bootstrap";
import SectionCard from "./SectionCard";

export default function ConnectedAccountsSection() {
    return (
        <SectionCard
            title="Connected Accounts"
            description="Manage third-party login providers."
        >
            <div className="d-flex flex-column gap-3">
                <Card className="border rounded-4">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="fw-bold mb-1">Google</h6>
                            <small className="text-muted">Connected account</small>
                        </div>

                        <Button variant="outline-danger">Disconnect</Button>
                    </Card.Body>
                </Card>

                <Card className="border rounded-4">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="fw-bold mb-1">GitHub</h6>
                            <small className="text-muted">No account connected</small>
                        </div>

                        <Button variant="dark">Connect</Button>
                    </Card.Body>
                </Card>
            </div>
        </SectionCard>
    );
}