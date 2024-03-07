import React from "react";

const PopupModal = ({ image, methodDelete, methodCancel, text }) => {
  return (
    <div className="absolute left-0 bottom-8 flex items-center justify-center h-full w-full flex-col bg-tooltip z-50 ">
      <div className="bg-white text-dark-light w-[40rem] h-[18rem] flex items-center justify-between flex-row rounded-2xl ">
        <div className="relative w-1/3 h-full ml-3">
          <img src={image} alt="delete" className="h-full" />
        </div>
        <div className="mr-6 flex items-center flex-col gap-y-4">
          <p className="text-lg font-medium">
            Are you sure you want to delete this {text}?
          </p>
          <button
            onClick={methodDelete}
            className="border border-spacing-1 border-purple-800 py-2 px-4 rounded-lg text-dark-light bg-white hover:bg-purple-800 hover:text-white transition-all duration-300 ease-linear"
          >
            Yes, delete
          </button>
          <button
            onClick={methodCancel}
            className="border border-spacing-1 border-red-500 py-2 px-8 rounded-lg text-white bg-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 ease-linear"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
