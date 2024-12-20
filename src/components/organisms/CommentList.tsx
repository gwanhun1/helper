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
  onTogglePostLike: () => void;
  onToggleCommentLike: (postId: string, commentId: string) => Promise<void>;
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
  onTogglePostLike,
  onToggleCommentLike,
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
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <FaRobot className="text-[#666666] text-sm" />
          </div>
          <span className="text-xs text-[#999999]">
            {formatDate(mainContent.date)}
          </span>
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

      <div className="space-y-3 mt-4 ml-10">
        {comments
          .filter((comment): comment is CommentType => Boolean(comment && comment.id))
          // 중복된 ID 제거
          .filter((comment, index, self) => 
            index === self.findIndex((c) => c.id === comment.id)
          )
          .map((comment) => (
          <Comment
            key={comment.id}
            username={comment.username || '익명'}
            content={comment.content}
            date={comment.date || ''}
            likes={comment.likes || 0}
            isLiked={comment.id ? commentLikeStates[comment.id] : false}
            onToggleLike={() => comment.id && onToggleCommentLike(mainContent.id, comment.id)}
            disabled={isLoading}
            formatDate={formatDate}
          />
        ))}
      </div>

      <div className="mt-4">
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
