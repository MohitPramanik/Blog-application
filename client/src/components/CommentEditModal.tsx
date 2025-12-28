import { Button, Modal, Form } from 'react-bootstrap'
import "../styles/CommentEditModal.css";
import type { EditingCommentType } from '../types';
import { memo, useEffect, useState } from 'react';

type CommentEditModalType = {
    editingComment: EditingCommentType | null;
    show: boolean;
    onHide: () => void;
    handleUpdateComment: (message: string) => void;
}

const CommentEditModal: React.FC<CommentEditModalType> = ({ editingComment, show, onHide, handleUpdateComment }) => {

    const [modalText, setModalText] = useState<string>("");

    useEffect(() => {
        if (editingComment) {
            setModalText(editingComment?.text);
        }
    }, [editingComment])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalText(e.target.value)
    }


    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        handleUpdateComment(modalText);
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='comment-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSaveChanges}>
                    <Form.Group
                        className="mb-3"
                        controlId="edit-comment-modal"
                    >
                        <Form.Control as="textarea" rows={3} value={modalText} onChange={handleChange} />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSaveChanges} disabled={!modalText}>Save Changes</Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default memo(CommentEditModal);
