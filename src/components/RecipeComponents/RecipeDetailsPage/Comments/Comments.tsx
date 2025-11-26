'use client';

import { Comment } from '@/@core/domain/entities/Comment';
import { Heart, MessageCircle, MoreVertical, Reply, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../../../templates/base/Button/Button';

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: number) => void;
  currentUserId?: number;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  onAddComment,
  currentUserId,
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(
    new Set()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim(), replyingTo || undefined);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  const onLikeComment = (idComment: number) => {
    console.log(idComment);
  };

  const toggleReplies = (commentId: number) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `Há ${diffInHours}h`;
    if (diffInHours < 168) return `Há ${Math.floor(diffInHours / 24)}d`;
    return `Há ${Math.floor(diffInHours / 168)}sem`;
  };

  const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({
    comment,
    depth = 0,
  }) => {
    const isTopLevel = depth === 0;
    const showReplies = expandedReplies.has(comment.idComment);
    const hasReplies = comment.hasReplies();
    const canReply = isTopLevel && currentUserId;

    return (
      <div
        className={`${isTopLevel ? 'border-b border-border pb-6 mb-6' : 'mt-4'}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm relative overflow-hidden">
              {comment.author.avatar ? (
                <Image
                  fill
                  alt={comment.author.name}
                  src={comment.author.avatar}
                />
              ) : (
                comment.author.name.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">
                  {comment.author.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
          </div>

          <button className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="ml-13">
          <p className="text-foreground leading-relaxed mb-3">
            {comment.content}
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLikeComment(comment.idComment)}
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                comment.isCommentLiked
                  ? 'text-red-500'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${comment.isCommentLiked ? 'fill-current' : ''}`}
              />
              <span className="text-sm font-medium">{comment.likes}</span>
            </button>

            {canReply && (
              <button
                onClick={() =>
                  setReplyingTo(
                    replyingTo === comment.idComment ? null : comment.idComment
                  )
                }
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Reply className="w-4 h-4" />
                <span className="text-sm font-medium">Responder</span>
              </button>
            )}

            {hasReplies && isTopLevel && (
              <button
                onClick={() => toggleReplies(comment.idComment)}
                className="text-sm text-primary hover:text-primary-dark font-medium transition-colors duration-200"
              >
                {showReplies
                  ? 'Ocultar respostas'
                  : `Ver ${comment.replies.length} resposta${comment.replies.length > 1 ? 's' : ''}`}
              </button>
            )}
          </div>

          {replyingTo === comment.idComment && (
            <form onSubmit={handleSubmit} className="mt-4 flex space-x-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="flex-1 p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground"
              />
              <Button type="submit" variant="primary" size="small" icon={Send}>
                Enviar
              </Button>
            </form>
          )}
          {showReplies && hasReplies && (
            <div className="mt-4 pl-6 border-l-2 border-border/30">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.idComment}
                  comment={reply}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Comentários ({comments.length})
        </h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Conversa da comunidade</span>
        </div>
      </div>

      {currentUserId && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Compartilhe sua experiência com esta receita..."
                rows={3}
                className="w-full p-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none transition-colors duration-200"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="large"
              icon={Send}
              disabled={!newComment.trim()}
              className="self-end"
            >
              Comentar
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-0">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.idComment} comment={comment} />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum comentário ainda
            </h3>
            <p className="text-muted-foreground">
              Seja o primeiro a compartilhar sua experiência com esta receita!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
