"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
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
        <Image alt="avatar" src={user?.image || "/images/user.png"} fill />
      </div>
      <span
        className="
            absolute top-0 right-0
            block rounded-full
            bg-green-500
            ring ring-neutral-900
            h-2 w-2 md:h-3 md:w-3
        "
      />
    </div>
  );
};

export default Avatar;
