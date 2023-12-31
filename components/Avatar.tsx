"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./conversations/conversationId/ImageModal";

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <>
      <ImageModal
        src={user.image || "/images/user.svg"}
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
      />
      <div
        className="relative animate-pop"
        onClick={() => {
          setImageModalOpen(true);
        }}
      >
        <div
          className="
          cursor-pointer
          relative
          rounded-xl hover:rounded-md
          overflow-hidden
          h-9 w-9 md:h-11 md:w-11
          transition-all
        "
        >
          <Image alt="avatar" src={user?.image || "/images/user.svg"} fill />
        </div>
      </div>
    </>
  );
};

export default Avatar;
