import { randomUUID } from "node:crypto";
import { endpoint, recordId, stringInput, HttpError } from "../server/http";
import { services } from "../server/firebase";
export default endpoint(["POST"], async (req, uid) => {
  const id = recordId(req.body?.id);
  const action = req.body?.action;
  if (!["like", "comment", "deleteComment", "likeComment"].includes(action)) throw new HttpError(400, "잘못된 요청입니다.");
  const content = action === "comment" ? stringInput(req.body?.content, "댓글", 500) : "";
  const commentId = ["deleteComment", "likeComment"].includes(action) ? recordId(req.body?.commentId) : randomUUID();
  let failure = "기록을 찾을 수 없습니다.";
  const result = await services().db.ref(`publicContents/${id}`).transaction(post => {
    if (!post) return null;
    if (post.open !== true) return;
    if (action === "like") {
      post.likedBy ||= {};
      if (post.likedBy[uid]) delete post.likedBy[uid]; else post.likedBy[uid] = true;
      post.like = Object.keys(post.likedBy).length;
    } else {
      post.comments ||= {};
      if (action === "comment") {
        post.comments[commentId] = { id: commentId, userId: uid, username: "익명의 숲지기", content, date: new Date().toISOString(), likes: 0 };
      } else {
        const comment = post.comments[commentId];
        if (!comment) { failure = "댓글을 찾을 수 없습니다."; return; }
        if (action === "deleteComment") {
          if (comment.userId !== uid) { failure = "내 댓글만 삭제할 수 있습니다."; return; }
          delete post.comments[commentId];
        } else {
          comment.likedBy ||= {};
          if (comment.likedBy[uid]) delete comment.likedBy[uid]; else comment.likedBy[uid] = true;
          comment.likes = Object.keys(comment.likedBy).length;
        }
      }
    }
    return post;
  });
  if (!result.committed || !result.snapshot.exists()) throw new HttpError(403, failure);
  return { success: true };
});
