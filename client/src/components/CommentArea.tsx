import { useEffect, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import axios from 'axios';
import CommentItem from './CommentItem';
import { useAuth } from '../context/AuthContext';
import CommentEditModal from './CommentEditModal';
import type { EditingCommentType } from '../types';

type CommentAreaProps = {
    blogId: string | undefined;
    increaseCommentCount: () => void;
    decreaseCommentCount: () => void;
}

type Comment = {
    _id: string;
    comment: object;
    likes: number;
    dislikes: number;
};

const CommentArea: React.FC<CommentAreaProps> = ({ blogId = "", increaseCommentCount, decreaseCommentCount }) => {

    const [commentText, setCommentText] = useState<string>('');
    const [submittingComment, setSubmittingComment] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>([]);
    const [editingComment, setEditingComment] = useState<EditingCommentType | null>(null)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const { user } = useAuth();


    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmittingComment(true);

        try {
            let response = await api.post(`/comment/${blogId}`, {
                content: commentText
            });
            toast.success(response.data.message);
            fetchComments();
            setCommentText("");
            increaseCommentCount();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
        finally {
            setSubmittingComment(false);
        }

    }

    const fetchComments = async () => {
        setLoading(true);
        try {
            let response = await api(`/comment/${blogId}`);
            setComments(response.data.data);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    const handleCommentLike = async (id: string) => {
        try {
            await api.put(`/comment/${id}/like`);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCommentDislike = async (id: string) => {
        try {
            await api.put(`/comment/${id}/dislike`);
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleDeleteComment = async (commentId: string) => {
        try {
            setLoading(true);
            let response = await api.delete(`/comment/${commentId}`);
            toast.success(response.data.message);
            fetchComments();
            decreaseCommentCount();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
        finally {
            setLoading(true);
        }
    }

    const handleUpdateComment = async (message: string) => {
        try {
            await api.put(`/comment/${editingComment?.id}`, {
                content: message
            })

            toast.success("Comment updated successfully");
            setOpenEditModal(false);

            let modifiedComments = comments.map((comment) => {
                return (comment._id === editingComment?.id) ?
                    { ...comment, content: message } :
                    comment
            }); 

            setComments(modifiedComments);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }

    useEffect(() => {
        fetchComments();
    }, [blogId])

    return (
        <>
            {/* Comments Section */}
            <Card className="comments-section border-0 shadow-sm overflow-hidden" >
                <Card.Body className="p-4">
                    <h4 className="mb-4 fw-bold">Comments ({comments.length})</h4>

                    {/* Add Comment Form */}
                    <Form onSubmit={handleAddComment} className="mb-5 pb-4 border-bottom">
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-500">Add your comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Share your thoughts..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                disabled={submittingComment}
                                className="comment-textarea"
                            />
                        </Form.Group>
                        <Button
                            className='primary-btn'
                            type="submit"
                            disabled={!commentText.trim() || submittingComment}
                        >
                            {submittingComment ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Posting...
                                </>
                            ) : (
                                'Post Comment'
                            )}
                        </Button>
                    </Form>

                    {/* Comments List */}
                    <div className="comments-list">
                        {loading ? (
                            <div className="text-center py-4">
                                <Spinner animation="border" />
                            </div>
                        ) : comments?.length > 0 ? (
                            comments.map((comment) => (
                                <CommentItem
                                    key={comment._id}
                                    comment={comment}
                                    user={user}
                                    onLike={() => handleCommentLike(comment._id)}
                                    onDislike={() => handleCommentDislike(comment._id)}
                                    handleDeleteComment={handleDeleteComment}
                                    setOpenEditModal={setOpenEditModal}
                                    setEditingComment={setEditingComment}
                                />
                            ))
                        ) : (
                            <p className="text-muted text-center py-4">
                                No comments yet. Be the first to comment!
                            </p>
                        )}
                    </div>

                </Card.Body>
            </Card>

            <CommentEditModal
                editingComment={editingComment}
                show={openEditModal}
                onHide={() => setOpenEditModal(false)}
                handleUpdateComment={handleUpdateComment}
            />
        </>

    )
}

export default CommentArea
