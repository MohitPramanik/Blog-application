import { Button, Form } from "react-bootstrap";
import SectionCard from "./SectionCard";

export default function SecuritySection() {
    return (
        <SectionCard
            title="Security"
            description="Manage password and account protection settings."
        >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new password" />
                </Form.Group>

                <Form.Check
                    type="switch"
                    id="2fa-switch"
                    label="Enable Two-Factor Authentication"
                    className="mb-4"
                />

                <Button variant="dark">Update Password</Button>
            </Form>
        </SectionCard>
    );
}