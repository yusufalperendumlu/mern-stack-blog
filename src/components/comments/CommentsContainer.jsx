import React, { useState, useEffect } from "react";

import Comment from "./Comment";
import { getCommentsData } from "../../data/comments";

import CommentForm from "./CommentForm";

const CommentsContainer = ({ className }) => {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((comment) => comment.parent === null);

  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "10",
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };

    setComments((cutState) => {
      return [newComment, ...cutState];
    });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-2 mt-8 text-b">
        {mainComments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
