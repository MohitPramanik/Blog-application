import React from 'react';
import { Card, Button, Image, Badge } from 'react-bootstrap';
import type { Comment as CommentType } from '../types';
import '../styles/Comment.css';

interface CommentItemProps {
  comment: CommentType;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onLike, onDislike }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="comment-item mb-3 border-0">
      <Card.Body className="p-3">
        <div className="d-flex gap-3">
          <Image
            src={comment.author.avatar}
            alt={comment.author.username}
            roundedCircle
            width={40}
            height={40}
            className="flex-shrink-0"
          />

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 className="mb-0 fw-bold text-dark">
                  {comment.author.username}
                </h6>
                <small className="text-muted">{formatDate(comment.createdAt)}</small>
              </div>
            </div>

            <p className="comment-content mb-3 text-dark">{comment.content}</p>

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
