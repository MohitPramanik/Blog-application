import { Button, Form } from "react-bootstrap";
import SectionCard from "./SectionCard";

export default function AppearanceSection() {
    return (
        <SectionCard
            title="Appearance"
            description="Customize how the application looks for you."
        >
            <Form>
                <Form.Group className="mb-4">
                    <Form.Label>Font Size</Form.Label>
                    <Form.Select>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Content Width</Form.Label>
                    <Form.Select>
                        <option>Compact</option>
                        <option>Comfortable</option>
                        <option>Wide</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="dark">Save Appearance</Button>
            </Form>
        </SectionCard>
    );
}