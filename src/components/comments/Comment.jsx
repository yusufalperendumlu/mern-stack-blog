import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

import { images } from "../../constants";

import CommentForm from "./CommentForm";
import autoAnimate from "@formkit/auto-animate";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const deleteClickHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const deleteConfirmHandler = () => {
    deleteComment(comment._id);

    setShowDeleteConfirmation(false);
  };

  const deleteCancelHandler = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
      <img
        src={images.ProfileImage}
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <MdEdit className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={deleteClickHandler}
              >
                <MdDeleteOutline className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {showDeleteConfirmation && (
          <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full flex-col bg-tooltip z-50">
            <div className="bg-sky-500 text-white w-1/3 h-1/3 flex items-center justify-center flex-col rounded-2xl">
              <p>Are you sure you want to delete this comment?</p>
              <button onClick={deleteConfirmHandler}>Yes, delete</button>
              <button onClick={deleteCancelHandler}>Cancel</button>
            </div>
          </div>
        )}

        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div ref={autoAnimate}>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                logginedUserId={logginedUserId}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                addComment={addComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                replies={[]}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
