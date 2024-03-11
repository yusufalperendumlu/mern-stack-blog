import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

import { stables, images } from "../constants";
import PopupModal from "./modal/PopupModal";

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
    }
  };

  return (
    <div className="w-full flex items-center gap-x-4">
      <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1  outline-primary overflow-hidden ">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
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
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent hover:bg-[#3fb3c51c] transition-all duration-300 ease-linear"
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="avatarImage"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera />
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
          disabled={isLoading || !avatar}
          type="button"

          className="border border-red-500 rounded-lg px-4 py-2 text-red-500 disabled:hidden hover:bg-red-500 hover:text-white transition-all duration-300 ease-linear"
        >
          <AiOutlineDelete />
        </button>
        {showDeleteConfirmation && (
          <PopupModal
            text={"image"}
            image={images.DeleteImage}
            methodDelete={handleDeleteImage}
            methodCancel={deleteCancelHandler}
          />
        )}
      </div>
    </>

  );
};

export default ProfilePicture;
