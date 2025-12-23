import React from 'react';
import { Card, Button, Image, Badge, Dropdown } from 'react-bootstrap';
import profileImgagePlaceholder from '../assets/common/profile-placeholder.jpg';
import { formatTimeToPeriod } from "../utils/formatDate";
import '../styles/Comment.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';
import type { User } from '../types';

interface CommentItemProps {
  comment: any;
  user: User | null
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, user, onLike, onDislike, handleDeleteComment }) => {

  return (
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
          />

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 className="mb-0 fw-bold">
                  {comment?.author?.username || "User"}
                </h6>
                <small className="text-muted">{formatTimeToPeriod(comment.createdAt)}</small>
              </div>

              {
                comment.author._id === user?.userId ? (
                  <Dropdown>
                    <Dropdown.Toggle className='blog-update-toggle-menu'>
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Button}> <MdEdit className='me-2' />Edit</Dropdown.Item>
                      <Dropdown.Item as={Button} onClick={() => handleDeleteComment(comment._id)}><MdDelete className='me-2' />Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null
              }

            </div>

            <p className="comment-content mb-3">{comment.content}</p>

            <div className="comment-actions">
              <Button
                variant="light"
                size="sm"
                className={`btn-like ${comment.userVote === 'like' ? 'active' : ''}`}
                onClick={() => onLike(comment.id)}
              >
                👍 {comment.likes > 0 ? comment.likes : ''}
              </Button>

              <Button
                variant="light"
                size="sm"
                className={`btn-dislike ${comment.userVote === 'dislike' ? 'active' : ''}`}
                onClick={() => onDislike(comment.id)}
              >
                👎 {comment.dislikes > 0 ? comment.dislikes : ''}
              </Button>

              {comment.likes > 0 && (
                <Badge bg="success" className="ms-2">
                  {comment.likes} like{comment.likes !== 1 ? 's' : ''}
                </Badge>
              )}

              {comment.dislikes > 0 && (
                <Badge bg="danger" className="ms-2">
                  {comment.dislikes} dislike{comment.dislikes !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CommentItem;
