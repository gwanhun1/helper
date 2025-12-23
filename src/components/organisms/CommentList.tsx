import React, { FormEvent } from 'react';
import { motion } from "framer-motion";
import Comment from "./Comment";
import CommentInput from "../molecules/CommentInput";
import LikeButton from "../molecules/LikeButton";
import { FaRobot } from "react-icons/fa";
import { Comment as CommentType, MainContent } from '../../types/comment';

interface CommentListProps {
  mainContent: MainContent;
  comments: any;
  isPostLiked: boolean;
  commentLikeStates: { [key: string]: boolean };
  currentUsername?: string;
  onTogglePostLike: () => void;
  onToggleCommentLike: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
  newComment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  formatDate: (date: string | undefined) => string;
}

const CommentList = ({
  mainContent,
  comments,
  isPostLiked,
  commentLikeStates,
  currentUsername,
  onTogglePostLike,
  onToggleCommentLike,
  onDeleteComment,
  newComment,
  onCommentChange,
  onCommentSubmit,
  isLoading,
  formatDate
}: CommentListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-2xl border border-[#E5E8EB]"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <FaRobot className="text-blue-500 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#333333]">AI 상담사</span>
            <span className="text-xs text-[#999999]">
              {formatDate(mainContent.date)}
            </span>
          </div>
        </div>
      </div>

      <div className="ml-10">
        <p className="text-[15px] text-[#333333] leading-relaxed mb-3">
          {mainContent.response}
        </p>
        <LikeButton
          isLiked={isPostLiked}
          count={mainContent.like || 0}
          onToggle={onTogglePostLike}
          disabled={isLoading}
        />
      </div>

      {/* 댓글 목록 */}
      {comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-[#333333]">댓글</span>
            <span className="text-xs text-[#999999]">{comments.length}개</span>
          </div>
          <div className="space-y-3">
            {comments
              .filter((comment: CommentType): comment is CommentType => Boolean(comment && comment.id))
              .filter((comment: CommentType, index: number, self: CommentType[]) => 
                index === self.findIndex((c) => c.id === comment.id)
              )
              .map((comment: CommentType) => {
                const isMyComment = currentUsername ? comment.username === currentUsername : false;
                return (
                  <Comment
                    key={comment.id}
                    username={comment.username || '익명'}
                    content={comment.content}
                    date={comment.date || ''}
                    likes={comment.likes || 0}
                    isLiked={comment.id ? commentLikeStates[comment.id] : false}
                    onToggleLike={() => comment.id && onToggleCommentLike(comment.id)}
                    onDelete={isMyComment && onDeleteComment ? () => onDeleteComment(comment.id) : undefined}
                    isMyComment={isMyComment}
                    disabled={isLoading}
                    formatDate={formatDate}
                  />
                );
              })}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <CommentInput
          value={newComment}
          onChange={onCommentChange}
          onSubmit={onCommentSubmit}
          disabled={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default CommentList;
