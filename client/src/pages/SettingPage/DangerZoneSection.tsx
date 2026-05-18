import { Alert, Button, Modal } from "react-bootstrap";
import SectionCard from "./SectionCard";

interface DangerZoneSectionProps {
    showDeleteModal: boolean;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DangerZoneSection({ showDeleteModal, setShowDeleteModal }: DangerZoneSectionProps) {
    return (
        <>
            <SectionCard
                title="Danger Zone"
                description="Irreversible and destructive account actions. Humanity loves placing these at the bottom after pretending everything above was peaceful."
            >
                <Alert variant="danger" className="rounded-4">
                    Deleting your account will permanently remove your blogs, comments,
                    and saved data.
                </Alert>

                <div className="d-flex gap-3 flex-wrap">
                    <Button variant="outline-dark">Export My Data</Button>

                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete Account
                    </Button>
                </div>
            </SectionCard>

            <Modal
                centered
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    This action cannot be undone. Your posts, comments, and account data
                    will be permanently removed.
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>

                    <Button variant="danger">Delete Permanently</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}