import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";

import { stables } from "../constants";

import CropEasy from "./crop/CropEasy";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../services/index/users";
import { userActions } from "../store/reducers/userReducers";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const deleteClickHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const deleteCancelHandler = () => {
    setShowDeleteConfirmation(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile photo is removed", {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          border: "2px solid #10b981",
        },
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          border: "2px solid #ff4b48",
        },
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
      });
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", undefined);

      mutate({ token: userState.userInfo.token, formData });
      setPhoto(null);
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}
      <div className="w-full flex items-center gap-x-4 mb-4">
        <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1  outline-primary overflow-hidden ">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="avatarImage"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 " />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={deleteClickHandler}
          disabled={isLoading || photo == null}
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500 disabled:hidden hover:bg-red-500 hover:text-white transition-all duration-300 ease-linear"
        >
          Delete
        </button>
        {showDeleteConfirmation && (
          <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full flex-col bg-tooltip z-50">
            <div className="bg-sky-500 text-white w-1/3 h-1/3 flex items-center justify-center flex-col rounded-2xl">
              <p>Are you sure you want to delete this comment?</p>
              <button onClick={handleDeleteImage}>Yes, delete</button>
              <button onClick={deleteCancelHandler}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePicture;
