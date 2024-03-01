import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";

import { stables } from "../constants";

import CropEasy from "./crop/CropEasy";

const ProfilePicture = ({ avatar }) => {
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  return (
<<<<<<< HEAD
    <div className="w-full flex items-center gap-x-4">
      <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1  outline-primary overflow-hidden ">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
=======
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}
      <div className="w-full flex items-center gap-x-4">
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
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
>>>>>>> 5ef3660e6791b878a2613fa4a1b3e5564f01d7ff
        >
          Delete
        </button>
      </div>
<<<<<<< HEAD
      <button
        type="button"
        className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
      >
        Delete
      </button>
    </div>
=======
    </>
>>>>>>> 5ef3660e6791b878a2613fa4a1b3e5564f01d7ff
  );
};

export default ProfilePicture;
