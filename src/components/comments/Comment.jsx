import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

import { images } from "../../constants";

const Comment = ({ comment }) => {
  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
      <img
        src={images.ProfileImage}
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs">
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
        <p className="font-opensans mt-[10px] text-dark-light">
          {comment.desc}
        </p>
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          <button className="flex items-center space-x-2">
            <FiMessageSquare className="w-4 h-auto" />
            <span>Reply</span>
          </button>
          <button className="flex items-center space-x-2">
            <MdEdit className="w-4 h-auto" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2">
            <MdDeleteOutline className="w-4 h-auto" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
