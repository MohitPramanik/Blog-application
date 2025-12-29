import React, { useState } from 'react';
import { Card, Button, Image, Dropdown } from 'react-bootstrap';
import profileImgagePlaceholder from '../assets/common/profile-placeholder.jpg';
import { formatTimeToPeriod } from "../utils/formatDate";
import '../styles/Comment.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';
import type { User, EditingCommentType } from '../types';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";


interface CommentItemProps {
  comment: any;
  user: User | null
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingComment: React.Dispatch<React.SetStateAction<EditingCommentType | null>>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, user, onLike, onDislike, handleDeleteComment, setOpenEditModal, setEditingComment }) => {

  const [like, setLike] = useState<boolean>(comment.isLiked || false);
  const [likeCount, setLikeCount] = useState<number>(comment.likedCount || 0)

  const likeComment = (id: string) => {
    onLike(id);
    setLike(true);
    setLikeCount((prev) => prev + 1);
  }

  const dislikeComment = (id: string) => {
    onDislike(id);
    setLike(false);
    setLikeCount((prev) => prev - 1);
  }

  const handleEdit = () => {
    setEditingComment({
      id: comment._id,
      text: comment.content
    })

    setOpenEditModal(true);
  }

  return (
    <>
      <Card className="comment-item mb-3 border-0">
        <Card.Body className="p-3">
          <div className="d-flex gap-3">
            <Image
              src={comment.author.profileImageUrl || profileImgagePlaceholder}
              alt={comment.author.username || "user image"}
              roundedCircle
              width={40}
              height={40}
              className="flex-shrink-0 object-fit-cover"
              loading='lazy'
            />

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="mb-0 fw-bold">
                    {comment?.author?.username || "User"}
                  </h6>
                  <small className="text-muted">{formatTimeToPeriod(comment.createdAt)}</small>
                </div>

                {/* to display the modify option to only authorized user (author of comment) */}
                {
                  comment.author._id === user?.userId ? (
                    <Dropdown>
                      <Dropdown.Toggle className='blog-update-toggle-menu'>
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as={Button} onClick={handleEdit}> <MdEdit className='me-2' />Edit</Dropdown.Item>
                        <Dropdown.Item as={Button} onClick={() => handleDeleteComment(comment._id)}><MdDelete className='me-2' />Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : null
                }

              </div>

              <p className="comment-content mb-3">{comment.content}</p>

              <div className="comment-actions">
                {
                  like ? (
                    <Button
                      size="sm"
                      className="btn-like"
                      onClick={() => dislikeComment(comment.id)}
                    >
                      <AiFillLike />
                      {likeCount}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="btn-dislike"
                      onClick={() => likeComment(comment.id)}
                    >
                      <AiOutlineLike />
                      {likeCount}
                    </Button>
                  )
                }

                {/* {comment.likes > 0 && (
                <Badge bg="success" className="ms-2">
                  {comment.likes} like{comment.likes !== 1 ? 's' : ''}
                </Badge>
              )}

              {comment.dislikes > 0 && (
                <Badge bg="danger" className="ms-2">
                  {comment.dislikes} dislike{comment.dislikes !== 1 ? 's' : ''}
                </Badge>
              )} */}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

    </>
  );
};

export default CommentItem;
