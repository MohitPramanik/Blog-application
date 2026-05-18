import { Button, Form } from "react-bootstrap";
import SectionCard from "./SectionCard";

export default function NotificationSection() {
    return (
        <SectionCard
            title="Notifications"
            description="Choose what updates you want to receive."
        >
            <Form>
                <Form.Check
                    type="switch"
                    label="Email me when someone comments on my blog"
                    className="mb-3"
                />

                <Form.Check
                    type="switch"
                    label="Email me when someone likes my post"
                    className="mb-3"
                />

                <Form.Check
                    type="switch"
                    label="Weekly newsletter updates"
                    className="mb-4"
                />

                <Button variant="dark">Save Preferences</Button>
            </Form>
        </SectionCard>
    );
}