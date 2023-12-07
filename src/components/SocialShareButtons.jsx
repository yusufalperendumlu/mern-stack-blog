import React from "react";
import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareReddit,
  FaSquareWhatsapp,
} from "react-icons/fa6";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        href={`https://www.facebook.com/dialog/share?app_id=1180206992856877&display=popup&href=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaSquareFacebook className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaSquareXTwitter className="text-black w-12 h-auto" />
      </a>
      <a
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaSquareReddit className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        href={`https://api.whatsapp.com/send/?text=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaSquareWhatsapp className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
