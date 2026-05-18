import { Button, Form } from "react-bootstrap";
import SectionCard from "./SectionCard";

export default function PrivacySection() {
    return (
        <SectionCard
            title="Privacy"
            description="Control how your information is visible to others."
        >
            <Form>
                <Form.Check
                    type="switch"
                    label="Make my profile public"
                    className="mb-3"
                />

                <Form.Check
                    type="switch"
                    label="Allow search engines to index my blogs"
                    className="mb-3"
                />

                <Form.Check
                    type="switch"
                    label="Allow other users to message me"
                    className="mb-4"
                />

                <Button variant="dark">Save Privacy Settings</Button>
            </Form>
        </SectionCard>
    );
}